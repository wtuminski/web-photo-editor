mod common;

wasm_bindgen_test::wasm_bindgen_test_configure!(run_in_browser);

#[cfg(test)]
mod pixel_processor_tests {
    use js_sys::Uint8ClampedArray;
    use rstest::rstest;
    use wasm_bindgen::JsValue;
    use wasm_bindgen_test::wasm_bindgen_test;

    use super::common::pixel_processors_mocks::{
        GRAYSCALE_OUTPUT, HUE_OUTPUT, INVERSION_OUTPUT, LUMINOSITY_OUTPUT, PIXELS_PROCESSOR_INPUT,
        SATURATION_OUTPUT,
    };
    use rust_pixels_processor::{PixelsProcessors, SIMDPixelsProcessors};

    type PixelChannels = Uint8ClampedArray;

    #[rstest]
    #[wasm_bindgen_test]
    #[case::grayscale(PixelsProcessors::grayscale, GRAYSCALE_OUTPUT.to_vec())]
    #[ignore = "not implemented"]
    #[wasm_bindgen_test]
    #[case::inversion(PixelsProcessors::inversion, INVERSION_OUTPUT.to_vec())]
    #[ignore = "not implemented"]
    #[wasm_bindgen_test]
    #[case::hue(PixelsProcessors::hue, HUE_OUTPUT.to_vec())]
    #[ignore = "not implemented"]
    #[wasm_bindgen_test]
    #[case::saturation(PixelsProcessors::saturation, LUMINOSITY_OUTPUT.to_vec())]
    #[ignore = "not implemented"]
    #[wasm_bindgen_test]
    #[case::luminosity(PixelsProcessors::luminosity, SATURATION_OUTPUT.to_vec())]
    #[ignore = "not implemented"]
    #[wasm_bindgen_test]
    #[case::grayscale_simd(SIMDPixelsProcessors::grayscale, GRAYSCALE_OUTPUT.to_vec())]
    #[ignore = "not implemented"]
    #[wasm_bindgen_test]
    #[case::inversion_simd(SIMDPixelsProcessors::inversion, INVERSION_OUTPUT.to_vec())]
    #[ignore = "not implemented"]
    #[wasm_bindgen_test]
    #[case::hue_simd(SIMDPixelsProcessors::hue, HUE_OUTPUT.to_vec())]
    #[ignore = "not implemented"]
    #[wasm_bindgen_test]
    #[case::saturation_simd(SIMDPixelsProcessors::saturation, LUMINOSITY_OUTPUT.to_vec())]
    #[ignore = "not implemented"]
    #[wasm_bindgen_test]
    #[case::luminosity_simd(SIMDPixelsProcessors::luminosity, SATURATION_OUTPUT.to_vec())]
    fn image_processor_test(
        #[case] processor: fn(PixelChannels, u8) -> PixelChannels,
        #[case] expected: Vec<u8>,
    ) {
        // given
        let input = PixelChannels::new(&JsValue::from_f64(PIXELS_PROCESSOR_INPUT.len() as f64));
        input.copy_from(&PIXELS_PROCESSOR_INPUT);

        // when
        let output = processor(input, 0);

        // then
        assert_eq!(output.to_vec(), expected);
    }
}
