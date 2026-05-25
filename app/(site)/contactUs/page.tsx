import Image from 'next/image'
import React from 'react'
import hero from "@/public/images/contactUs-images/hero.jpg"
import ContactUsForm from '@/components/contactUsForm'

const ContactUs = () => {
  return (
    <div className='w-fullflex-1 flex flex-col font-sans' dir="rtl">
      
      <div className='relative h-[95vh] w-full flex items-center justify-center text-center px-6 overflow-hidden bg-zinc-950'>
      
        <Image 
          src={hero} 
          alt="Modern luxury real estate"
          fill
          priority
          className="object-cover opacity-40 scale-105 transition-transform duration-10000" 
        />
        
        <div className='absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-10' />

        <div className='relative z-20 max-w-4xl space-y-6'>
          <span className='inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-amber-400 bg-amber-500/10 rounded-full border border-amber-500/20 backdrop-blur-md'>
            <span className='w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse' />
            نحن هنا لخدمتك دائماً
          </span>
          
          <h1 className='text-4xl md:text-6xl font-black text-white tracking-tight leading-none'>
            لنبدأ رحلة البحث عن <span className='text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200'>عقارك المثالي</span>
          </h1>
          
          <p className='text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-normal leading-relaxed'>
            سواء كنت تبحث عن سكن فاخر، استثمار مضمون، أو إدارة محترفة لأصولك؛ فريقنا من الخبراء مستعد للإجابة على كافة استفساراتك.
          </p>
        </div>
      </div>

      
        <div>
        <ContactUsForm/>

        </div>
       
    
    
      <div className='w-full h-[500px] bg-zinc-100 relative grayscale contrast-125 hover:grayscale-0 hover:contrast-100 transition-all duration-700 border-t border-zinc-200 mb-4'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109943.23726371308!2d31.081682749030076!3d30.55703988775991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7d7001bc66bc1%3A0xa2ab8337f943a709!2z2KjZitiqINin2YTYudiyINmK2Kcg2KjZitiq2YbYpw!5e0!3m2!1sar!2seg!4v1779641312374!5m2!1sar!2seg" width="100%" height="450" className="border:0; "  loading="lazy"></iframe>
      </div>

    </div>
  )
}

export default ContactUs