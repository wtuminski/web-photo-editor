mod common;

wasm_bindgen_test::wasm_bindgen_test_configure!(run_in_browser);

#[cfg(test)]
mod pixel_processor_tests {
    use js_sys::Uint8ClampedArray;
    use wasm_bindgen::JsValue;
    use wasm_bindgen_test::wasm_bindgen_test;

    use super::common::pixel_processors_mocks::{
        GRAYSCALE_OUTPUT, HUE_OUTPUT, INVERSION_OUTPUT, LUMINOSITY_OUTPUT, PIXELS_PROCESSOR_INPUT,
        SATURATION_OUTPUT,
    };
    use rust_pixels_processor::{PixelsProcessors, SIMDPixelsProcessors};

    type PixelChannels = Uint8ClampedArray;

    macro_rules! generate_pixels_processors_tests {
        ($($func_name:ident: ($pixels_processor:expr, $expected:expr),)+) => {
            $(
                #[wasm_bindgen_test]
                fn $func_name() {

                    // given
                    let input = PixelChannels::new(&JsValue::from_f64(PIXELS_PROCESSOR_INPUT.len() as f64));
                    input.copy_from(&PIXELS_PROCESSOR_INPUT);

                    // when
                    let output = $pixels_processor(input, 0);

                    // then
                    assert_eq!(output.to_vec(), $expected);
                }
            )*
        }
    }

    macro_rules! generate_pixels_processors_ignored_tests {
        ($($func_name:ident: ($pixels_processor:expr, $expected:expr),)+) => {
            $(
                #[ignore="not implemented yet"]
                #[wasm_bindgen_test]
                fn $func_name() {

                    // given
                    let input = PixelChannels::new(&JsValue::from_f64(PIXELS_PROCESSOR_INPUT.len() as f64));
                    input.copy_from(&PIXELS_PROCESSOR_INPUT);

                    // when
                    let output = $pixels_processor(input, 0);

                    // then
                    assert_eq!(output.to_vec(), $expected);
                }
            )*
        }
    }

    generate_pixels_processors_tests! {
        grayscale_test: (PixelsProcessors::grayscale, GRAYSCALE_OUTPUT.to_vec()),
        inversion_test: (PixelsProcessors::inversion, INVERSION_OUTPUT.to_vec()),
    }
    generate_pixels_processors_ignored_tests! {
        hue_test: (PixelsProcessors::hue, HUE_OUTPUT.to_vec()),
        saturation_test: (PixelsProcessors::saturation, SATURATION_OUTPUT.to_vec()),
        luminosity_test: (PixelsProcessors::luminosity, LUMINOSITY_OUTPUT.to_vec()),
        grayscale_simd_test: (SIMDPixelsProcessors::grayscale, GRAYSCALE_OUTPUT.to_vec()),
        inversion_simd_test: (SIMDPixelsProcessors::inversion, INVERSION_OUTPUT.to_vec()),
        hue_simd_test: (SIMDPixelsProcessors::hue, HUE_OUTPUT.to_vec()),
        saturation_simd_test: (SIMDPixelsProcessors::saturation, SATURATION_OUTPUT.to_vec()),
        luminosity_simd_test: (SIMDPixelsProcessors::luminosity, LUMINOSITY_OUTPUT.to_vec()),
    }
}
