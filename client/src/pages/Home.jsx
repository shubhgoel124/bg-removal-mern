import React from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import BgSlider from '../components/BgSlider'
import Testimonials from '../components/Testimonials'
import Upload from '../components/Upload'

const Home = () => {
    return (
        <main className='relative overflow-hidden'>
            <section className='relative z-10'>
                <Header />
            </section>

            <section className='section-shell section-shell-soft section-shell-rise'>
                <div className='section-inner'>
                    <Steps />
                </div>
            </section>

            <section className='section-shell section-shell-plain section-shell-rise-delay'>
                <div className='section-inner'>
                    <BgSlider />
                </div>
            </section>

            <section className='section-shell section-shell-soft section-shell-rise'>
                <div className='section-inner'>
                    <Testimonials />
                </div>
            </section>

            <section className='section-shell section-shell-plain section-shell-rise-delay'>
                <div className='section-inner'>
                    <Upload />
                </div>
            </section>
        </main>
    )
}

export default Home