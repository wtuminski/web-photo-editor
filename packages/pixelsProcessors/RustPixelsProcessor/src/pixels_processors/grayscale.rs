use crate::{constants::PIXEL_LENGTH, types::PixelChannels};

#[inline]
pub fn grayscale(pixel_channels: PixelChannels, filter_value: u8) -> PixelChannels {
    let filter_rate = 1f32 + filter_value as f32 / 100f32;

    pixel_channels
        .chunks_exact(PIXEL_LENGTH)
        .flat_map(|pixel| {
            let r = pixel[0] as f32;
            let g = pixel[1] as f32;
            let b = pixel[2] as f32;
            let alpha = pixel[3];

            let avg = f32::round(((r + g + b) / 3f32) * filter_rate);
            let adjusted_avg = u8::max(0, u8::min(255, avg as u8));

            [adjusted_avg, adjusted_avg, adjusted_avg, alpha]
        })
        .collect::<Vec<u8>>()
}
