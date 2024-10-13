use std::arch::wasm32::{
    f32x4, f32x4_div, f32x4_extract_lane, f32x4_max, f32x4_min, f32x4_mul, f32x4_nearest,
    f32x4_splat,
};

use crate::{
    constants::{
        PIXEL_LENGTH, {get_max_rgb_values, get_min_rgb_values, get_threes},
    },
    types::PixelChannels,
};

const FOUR_PIXELS_CHUNK_LEN: usize = PIXEL_LENGTH * 4;

struct Pixel {
    r: u16,
    g: u16,
    b: u16,
    a: u8,
}

#[inline(always)]
fn get_channels_in_chunks(four_pixles: &[u8]) -> [Pixel; 4] {
    [
        Pixel {
            r: u16::from(four_pixles[0]),
            g: u16::from(four_pixles[1]),
            b: u16::from(four_pixles[2]),
            a: four_pixles[3],
        },
        Pixel {
            r: u16::from(four_pixles[4]),
            g: u16::from(four_pixles[5]),
            b: u16::from(four_pixles[6]),
            a: four_pixles[7],
        },
        Pixel {
            r: u16::from(four_pixles[8]),
            g: u16::from(four_pixles[9]),
            b: u16::from(four_pixles[10]),
            a: four_pixles[11],
        },
        Pixel {
            r: u16::from(four_pixles[12]),
            g: u16::from(four_pixles[13]),
            b: u16::from(four_pixles[14]),
            a: four_pixles[15],
        },
    ]
}

#[inline(always)]
fn apply_grayscale_on_remainder_chunks(
    pixel_channels: &PixelChannels,
    remainder_length: usize,
    filter_value: i8,
) -> PixelChannels {
    assert!(pixel_channels.len() > remainder_length);
    let remainder_pixels = pixel_channels
        .get((pixel_channels.len() - remainder_length)..)
        .unwrap();
    crate::pixels_processors::grayscale(remainder_pixels.to_vec(), filter_value)
}

#[target_feature(enable = "simd128")]
pub unsafe fn _grayscale(pixel_channels: PixelChannels, filter_value: i8) -> PixelChannels {
    let filter_rate = f32x4_splat(1f32 + f32::from(filter_value) / 100f32);
    let max_rgb_values = get_max_rgb_values();
    let min_rgb_values = get_min_rgb_values();

    let updated_pixels =
        pixel_channels
            .chunks_exact(FOUR_PIXELS_CHUNK_LEN)
            .flat_map(move |four_pixles| {
                let [p1, p2, p3, p4] = get_channels_in_chunks(four_pixles);

                let avgs = f32x4_mul(
                    f32x4_div(
                        f32x4(
                            f32::from(p1.r + p1.g + p1.b),
                            f32::from(p2.r + p2.g + p2.b),
                            f32::from(p3.r + p3.g + p3.b),
                            f32::from(p4.r + p4.g + p4.b),
                        ),
                        get_threes(),
                    ),
                    filter_rate,
                );

                let normalized_avgs =
                    f32x4_nearest(f32x4_max(min_rgb_values, f32x4_min(avgs, max_rgb_values)));
                let normalized_avg = f32x4_extract_lane::<0>(normalized_avgs) as u8;
                let normalized_avg1 = f32x4_extract_lane::<1>(normalized_avgs) as u8;
                let normalized_avg2 = f32x4_extract_lane::<2>(normalized_avgs) as u8;
                let normalized_avg3 = f32x4_extract_lane::<3>(normalized_avgs) as u8;

                [
                    normalized_avg,
                    normalized_avg,
                    normalized_avg,
                    p1.a,
                    normalized_avg1,
                    normalized_avg1,
                    normalized_avg1,
                    p2.a,
                    normalized_avg2,
                    normalized_avg2,
                    normalized_avg2,
                    p3.a,
                    normalized_avg3,
                    normalized_avg3,
                    normalized_avg3,
                    p4.a,
                ]
            });

    let remainder_length = pixel_channels.len() % FOUR_PIXELS_CHUNK_LEN;
    let mut updated_pixels: PixelChannels = updated_pixels.collect();
    if remainder_length > 0 {
        updated_pixels.extend_from_slice(&apply_grayscale_on_remainder_chunks(
            &pixel_channels,
            remainder_length,
            filter_value,
        ));
    }
    updated_pixels
}

pub fn grayscale(pixel_channels: PixelChannels, filter_value: i8) -> PixelChannels {
    unsafe { _grayscale(pixel_channels, filter_value) }
}
