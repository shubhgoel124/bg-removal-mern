import React, { useState } from 'react';
import { assets } from '../assets/assets';

const BgSlider = () => {
    const [sliderPosition, setSliderPosition] = useState(50); // Initial slider position

    const handleSliderChange = (e) => {
        setSliderPosition(e.target.value);
    }

    return (
        <div className='mx-4 pb-10 pt-2 md:py-20 lg:mx-16'>

            {/* Title */}
            <h1 className='mb-12 text-center text-2xl font-semibold text-[#0f172a] sm:mb-14 md:text-3xl lg:text-4xl'>Precise cutouts with clean, natural edges</h1>

            <div className="glass-card relative m-auto w-full max-w-4xl overflow-hidden rounded-3xl p-3 shadow-lg">
                {/* Background Image */}
                <img src={assets.image_w_bg}
                    className='rounded-2xl'
                    style={{ clipPath: `inset(0 ${100.2 - sliderPosition}% 0 0)` }}
                />

                {/* Foreground Image */}
                <img src={assets.image_wo_bg}
                    className="absolute left-3 top-3 h-[calc(100%-24px)] w-[calc(100%-24px)] rounded-2xl"
                    style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
                />

                {/* Slider */}
                <input type="range" min="0" max="100" value={sliderPosition} onChange={handleSliderChange} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-10 slider" />
            </div>
        </div>
    );
};

export default BgSlider;
