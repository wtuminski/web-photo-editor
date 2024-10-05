use js_sys::Uint8ClampedArray;

pub type JSPixelChannels = Uint8ClampedArray;
pub type PixelChannels = Vec<u8>;

pub enum HSL {
    Hue,
    Saturation,
    Luminosity,
}
