pub const PIXEL_LENGTH: usize = 4;
pub const MIN_RGB_VALUE: u8 = u8::MIN;
pub const MAX_RGB_VALUE: u8 = u8::MAX;

// SIMD

use std::{arch::wasm32, sync};

static MIN_RGB_VALUES: sync::OnceLock<wasm32::v128> = sync::OnceLock::new();
static MAX_RGB_VALUES: sync::OnceLock<wasm32::v128> = sync::OnceLock::new();
static THREES: sync::OnceLock<wasm32::v128> = sync::OnceLock::new();
#[inline(always)]
pub fn get_min_rgb_values() -> wasm32::v128 {
    *MIN_RGB_VALUES.get_or_init(|| wasm32::f32x4_splat(f32::from(MIN_RGB_VALUE)))
}

#[inline(always)]
pub fn get_max_rgb_values() -> wasm32::v128 {
    *MAX_RGB_VALUES.get_or_init(|| wasm32::f32x4_splat(f32::from(MAX_RGB_VALUE)))
}

#[inline(always)]
pub fn get_threes() -> wasm32::v128 {
    *THREES.get_or_init(|| wasm32::f32x4_splat(3.0))
}
