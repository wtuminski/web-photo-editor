use wasm_bindgen::JsValue;

use crate::{
    constants::{MAX_RGB_VALUE, MIN_RGB_VALUE},
    types::{JSPixelChannels, PixelChannels},
};

pub fn set_panic_hook() {
    // When the `console_error_panic_hook` feature is enabled, we can call the
    // `set_panic_hook` function at least once during initialization, and then
    // we will get better error messages if our code ever panics.
    //
    // For more details see
    // https://github.com/rustwasm/console_error_panic_hook#readme
    #[cfg(feature = "console_error_panic_hook")]
    #[cfg(debug_assertions)]
    console_error_panic_hook::set_once();
}

#[inline(always)]
pub fn normalize_channel_value(channel_value: f32) -> u8 {
    match channel_value {
        v if v > f32::from(MAX_RGB_VALUE) => MAX_RGB_VALUE,
        v if v < f32::from(MIN_RGB_VALUE) => MIN_RGB_VALUE,
        v => v.round_ties_even() as u8,
    }
}

#[inline(always)]
pub fn use_image_filter(
    filter: fn(pixel_channels: PixelChannels, filter_value: i8) -> PixelChannels,
    pixel_channels: JSPixelChannels,
    filter_value: i8,
) -> JSPixelChannels {
    let _updated_pixel_channels = filter(pixel_channels.to_vec(), filter_value);
    let updated_pixel_channels =
        JSPixelChannels::new(&JsValue::from_f64(pixel_channels.length() as f64));

    updated_pixel_channels.copy_from(&_updated_pixel_channels);
    updated_pixel_channels
}

#[cfg(test)]
mod tests {
    use crate::constants::{MAX_RGB_VALUE, MIN_RGB_VALUE};

    //
    // normalize_channel_value tests
    //

    #[test]
    fn it_should_return_max_pixel_value() {
        assert_eq!(super::normalize_channel_value(256.0), MAX_RGB_VALUE);
    }

    #[test]
    fn it_should_return_min_pixel_value() {
        assert_eq!(super::normalize_channel_value(-1.0), MIN_RGB_VALUE);
    }

    #[test]
    fn it_should_round_return_value() {
        assert_eq!(super::normalize_channel_value(100.49), 100u8);
        assert_eq!(super::normalize_channel_value(100.50), 100u8);
        assert_eq!(super::normalize_channel_value(100.51), 101u8);

        assert_eq!(super::normalize_channel_value(101.49), 101u8);
        assert_eq!(super::normalize_channel_value(101.50), 102u8);
        assert_eq!(super::normalize_channel_value(101.51), 102u8);
    }

    //
    // use_image_filter tests
    //
    wasm_bindgen_test::wasm_bindgen_test_configure!(run_in_browser);

    #[wasm_bindgen_test::wasm_bindgen_test]
    fn it_should_return_updated_pixel_channels() {
        // given
        let pixel_channels = js_sys::Uint8ClampedArray::new_with_length(4);
        pixel_channels.copy_from(&vec![0, 0, 0, 255]);
        let filter_value = 0;
        let expected_pixel_channels = vec![100, 101, 102, 255];

        // when
        let updated_pixel_channels = super::use_image_filter(
            |_pixel_channels, _filter_value: i8| vec![100, 101, 102, 255],
            pixel_channels,
            filter_value,
        );

        // then
        assert_eq!(updated_pixel_channels.to_vec(), expected_pixel_channels);
    }
}
