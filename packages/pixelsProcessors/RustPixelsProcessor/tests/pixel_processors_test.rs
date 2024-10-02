mod common;

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
    use rust_pixels_processor::{ImageProcessors, SIMDImageProcessors};

    type PixelChannels = Uint8ClampedArray;

    #[rstest]
    #[wasm_bindgen_test]
    #[case::grayscale(ImageProcessors::grayscale, GRAYSCALE_OUTPUT.to_vec())]
    #[ignore = "not implemented"]
    #[wasm_bindgen_test]
    #[case::inversion(ImageProcessors::inversion, INVERSION_OUTPUT.to_vec())]
    #[ignore = "not implemented"]
    #[wasm_bindgen_test]
    #[case::hue(ImageProcessors::hue, HUE_OUTPUT.to_vec())]
    #[ignore = "not implemented"]
    #[wasm_bindgen_test]
    #[case::saturation(ImageProcessors::saturation, LUMINOSITY_OUTPUT.to_vec())]
    #[ignore = "not implemented"]
    #[wasm_bindgen_test]
    #[case::luminosity(ImageProcessors::luminosity, SATURATION_OUTPUT.to_vec())]
    #[ignore = "not implemented"]
    #[wasm_bindgen_test]
    #[case::grayscale_simd(SIMDImageProcessors::grayscale, GRAYSCALE_OUTPUT.to_vec())]
    #[ignore = "not implemented"]
    #[wasm_bindgen_test]
    #[case::inversion_simd(SIMDImageProcessors::inversion, INVERSION_OUTPUT.to_vec())]
    #[ignore = "not implemented"]
    #[wasm_bindgen_test]
    #[case::hue_simd(SIMDImageProcessors::hue, HUE_OUTPUT.to_vec())]
    #[ignore = "not implemented"]
    #[wasm_bindgen_test]
    #[case::saturation_simd(SIMDImageProcessors::saturation, LUMINOSITY_OUTPUT.to_vec())]
    #[ignore = "not implemented"]
    #[wasm_bindgen_test]
    #[case::luminosity_simd(SIMDImageProcessors::luminosity, SATURATION_OUTPUT.to_vec())]
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
