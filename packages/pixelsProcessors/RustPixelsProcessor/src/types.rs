use js_sys::Uint8ClampedArray;

pub type PixelChannels = Uint8ClampedArray;

pub enum HSL {
    Hue,
    Saturation,
    Luminosity,
}
