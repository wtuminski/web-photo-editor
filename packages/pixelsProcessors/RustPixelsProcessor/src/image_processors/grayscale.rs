use wasm_bindgen::JsValue;

use crate::{constants::PIXEL_LENGTH, types::PixelChannels};

pub fn grayscale(pixel_channels: PixelChannels, filter_value: u8) -> PixelChannels {
    let filter_rate = 1f32 + filter_value as f32 / 100f32;

    let _updated_pixel_channels = pixel_channels
        .to_vec()
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
        .collect::<Vec<u8>>();

    let updated_pixel_channels =
        PixelChannels::new(&JsValue::from_f64(_updated_pixel_channels.len() as f64));
    updated_pixel_channels.copy_from(&_updated_pixel_channels);

    updated_pixel_channels
}

// V2

// let filter_rate = 1f32 + filter_value as f32 / 100f32;
// let mut index = 0;
// let mut new_pixels: Vec<u8> = Vec::with_capacity(number_of_pixels);

// loop {
//     if index < number_of_pixels {
//         let r = pixels[index] as f32;
//         let g = pixels[index + 1] as f32;
//         let b = pixels[index + 2] as f32;
//         let a = pixels[index + 3];

//         let avg = ((r + g + b) / 3f32) * filter_rate;
//         let adjusted_avg = u8::max(0, u8::min(255, avg.round() as u8));

//         // let mut new_pixel = vec![adjusted_avg, adjusted_avg, adjusted_avg, a];
//         // new_pixels.append(&mut new_pixel);
//         new_pixels.push(adjusted_avg);
//         new_pixels.push(adjusted_avg);
//         new_pixels.push(adjusted_avg);
//         new_pixels.push(a);

//         // if let 988780..=988800 = index {
//         //     console_log!(
//         //         "r: {r}, g: {g}, b: {b}, avg: {avg}, avgR: {avg_r} adjAvg: {adjusted_avg}"
//         //     );
//         // }
//         index += 4;
//     } else {
//         break;
//     }
// }
