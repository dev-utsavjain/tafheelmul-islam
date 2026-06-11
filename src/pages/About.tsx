import { Heart, Globe, Target, Flame, Users, BookOpen, BriefcaseMedical, Baby, ShieldCheck, Home, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export function About() {
  return (
    <>
      <Helmet>
        <title>About Us | Tafheem-ul-Islam Trust</title>
        <meta name="description" content="Learn about Tafheem-ul-Islam Trust's journey, mission, and vision to serve humanity with compassion since 2015." />
      </Helmet>
      <main className="flex-grow flex flex-col gap-8 md:gap-20 px-4 sm:px-6 lg:px-20 w-full mx-auto pt-4 md:pt-12 pb-12 md:pb-24">
      {/* Hero Section */}
      <section className="bg-[#0a301d] rounded-[24px] md:rounded-[32px] p-6 sm:p-8 md:p-16 flex flex-col gap-8 md:gap-12 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
          <div className="flex flex-col gap-6 md:gap-8 order-2 lg:order-1">
            <div className="inline-flex items-center px-4 py-1.5 md:py-2 rounded-full border border-green-500/30 w-max text-[#bcff5f] text-xs md:text-sm font-semibold">
              About Tafheemul Islam Trust
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-[64px] text-white text-left font-bold leading-[1.1] tracking-tight">
              Serving Humanity with <br className="hidden md:block" /> Compassion Since 2015
            </h1>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-md">
              For more than a decade, Tafheemul Islam Trust has been dedicated to serving humanity with compassion, dignity, and unwavering commitment. Established in Anantnag district, Jammu and Kashmir, India, the Trust was founded on a simple belief: every person deserves support, opportunity, and hope, regardless of religion, caste, background, or geography.
            </p>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-md font-light">
              What began as a small community-driven effort has grown into a humanitarian mission that has touched countless lives. Throughout challenging times, our focus has remained unchanged—standing beside those who need help the most.
            </p>
          </div>
          
          {/* Hero Image Container */}
          <div className="relative w-full aspect-square sm:aspect-[4/3] rounded-[16px] sm:rounded-[24px] overflow-hidden order-1 lg:order-2">
            <img
              alt="Humanitarian efforts and caring for the community"
              className="w-full h-full object-cover"
              src="https://images.pexels.com/photos/6646923/pexels-photo-6646923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
            
            {/* Floating Glass Card (like Donate page) */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:bottom-6 sm:left-6 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col gap-2 sm:gap-4 shadow-xl max-w-[calc(100%-32px)] sm:max-w-xs">
              <div className="bg-[#e8fccd] w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#3d6200]" />
              </div>
              <p className="text-gray-700 font-medium leading-relaxed text-xs sm:text-sm md:text-base">
                Committed to serving humanity beyond all differences, creating brighter futures across India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey & Mission/Vision */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        <div className="bg-gray-50 border border-gray-200 rounded-[24px] md:rounded-[32px] p-6 sm:p-8 md:p-12 flex flex-col justify-center gap-4 md:gap-6 shadow-sm">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Our Journey
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            For over 10 years, we have worked among communities facing hardship, poverty, illness, displacement, and social challenges. During times of uncertainty, we chose compassion over division, service over recognition, and action over words.
          </p>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Our journey has been guided by the belief that meaningful change begins when communities come together to support one another. Every child educated, every family assisted, every patient supported, and every life impacted represents a step toward a more caring and equitable society.
          </p>
        </div>
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="bg-white border border-gray-200 shadow-sm rounded-[24px] md:rounded-[32px] p-6 sm:p-8 md:p-10 flex flex-col gap-4">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-[#12372a] shadow-sm mb-1 md:mb-0">
              <Target className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900">
              Our Mission
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              To empower vulnerable individuals and communities through education, healthcare, humanitarian assistance, and sustainable development programs that improve quality of life and create long-term opportunities.
            </p>
          </div>
          <div className="bg-white border border-gray-200 shadow-sm rounded-[24px] md:rounded-[32px] p-6 sm:p-8 md:p-10 flex flex-col gap-4">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-[#12372a] shadow-sm mb-1 md:mb-0">
              <Globe className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900">
              Our Vision
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              To build a society where every individual has access to education, healthcare, dignity, and equal opportunities, creating stronger and more resilient communities across India.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="bg-gray-50 rounded-[24px] md:rounded-[32px] p-6 sm:p-8 md:p-16 flex flex-col items-center gap-8 md:gap-12 text-center border border-gray-200 shadow-sm">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What We Do
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full text-left">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-sm">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-[#12372a] shadow-sm mb-1 md:mb-0">
              <BookOpen className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-900">Education Support</h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              We believe education is one of the most powerful tools for breaking the cycle of poverty. Through educational assistance, learning resources, and student support initiatives, we help children pursue brighter futures.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-sm">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-[#12372a] shadow-sm mb-1 md:mb-0">
              <BriefcaseMedical className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-900">Healthcare Assistance</h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Access to healthcare should never depend on financial circumstances. We support individuals and families by helping them access essential medical care, treatment, and health-related assistance.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-sm">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-[#12372a] shadow-sm mb-1 md:mb-0">
              <Baby className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-900">Orphan & Family Support</h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Many children and families face difficult circumstances without adequate support systems. Our programs aim to provide care, guidance, and resources that help them live with dignity and hope.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-sm">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-[#12372a] shadow-sm mb-1 md:mb-0">
              <Users className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-900">Widow Assistance</h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              We work to support widows and vulnerable women through welfare initiatives designed to strengthen financial stability, independence, and well-being.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-sm">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-[#12372a] shadow-sm mb-1 md:mb-0">
              <Flame className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-900">Disaster & Emergency Relief</h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              During natural disasters, emergencies, and crises, we provide immediate assistance to affected families through relief efforts and humanitarian support.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-sm">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-[#12372a] shadow-sm mb-1 md:mb-0">
              <Home className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-900">Community Development</h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Lasting change requires strong communities. Our community-focused initiatives aim to promote social welfare, self-reliance, and sustainable development.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-white border border-gray-200 shadow-sm rounded-[24px] md:rounded-[32px] p-6 sm:p-8 md:p-16 flex flex-col items-center justify-center gap-8 md:gap-12">
        <div className="text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Our Values
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full max-w-6xl mx-auto">
          <div className="flex flex-col gap-2 md:gap-4 items-center text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-[#12372a] shadow-sm mb-1 md:mb-0">
              <Heart className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <span className="font-bold text-gray-900 text-base md:text-lg">Humanity First</span>
            <p className="text-xs md:text-sm text-gray-500 hidden sm:block">We believe every human life has equal value and deserves respect, compassion, and care.</p>
          </div>
          <div className="flex flex-col gap-2 md:gap-4 items-center text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-[#12372a] shadow-sm mb-1 md:mb-0">
              <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <span className="font-bold text-gray-900 text-base md:text-lg">Integrity</span>
            <p className="text-xs md:text-sm text-gray-500 hidden sm:block">We are committed to transparency, accountability, and responsible stewardship of every contribution.</p>
          </div>
          <div className="flex flex-col gap-2 md:gap-4 items-center text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-[#12372a] shadow-sm mb-1 md:mb-0">
              <Target className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <span className="font-bold text-gray-900 text-base md:text-lg">Service</span>
            <p className="text-xs md:text-sm text-gray-500 hidden sm:block">Our work is driven by a genuine desire to help people overcome challenges and improve quality of life.</p>
          </div>
          <div className="flex flex-col gap-2 md:gap-4 items-center text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-[#12372a] shadow-sm mb-1 md:mb-0">
              <Globe className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <span className="font-bold text-gray-900 text-base md:text-lg">Inclusion</span>
            <p className="text-xs md:text-sm text-gray-500 hidden sm:block">We serve people irrespective of religion, caste, ethnicity, or social background.</p>
          </div>
          <div className="flex flex-col gap-2 md:gap-4 items-center text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-[#12372a] shadow-sm mb-1 md:mb-0">
              <Users className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <span className="font-bold text-gray-900 text-base md:text-lg">Empowerment</span>
            <p className="text-xs md:text-sm text-gray-500 hidden sm:block">We strive to create opportunities that enable individuals and communities to become self-reliant.</p>
          </div>
        </div>
      </section>

      {/* Why Support */}
      <section className="bg-gray-50 rounded-[24px] md:rounded-[32px] p-6 sm:p-8 md:p-12 border border-gray-200 shadow-sm flex flex-col gap-6 md:gap-8 max-w-4xl mx-auto w-full">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 text-center">
          Why Support Tafheemul Islam Trust?
        </h2>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
          <ul className="flex flex-col gap-4 text-gray-600 text-base sm:text-lg">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#12372a] shrink-0 mt-0.5" />
              <span>10+ years of humanitarian service</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#12372a] shrink-0 mt-0.5" />
              <span>Community-centered approach</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#12372a] shrink-0 mt-0.5" />
              <span>Transparent and responsible use of donations</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#12372a] shrink-0 mt-0.5" />
              <span>Focus on sustainable, long-term impact</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#12372a] shrink-0 mt-0.5" />
              <span>Dedicated support for vulnerable families and children</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#12372a] shrink-0 mt-0.5" />
              <span>Commitment to serving humanity beyond all differences</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Join Our Mission / CTA (styling from Donate) */}
      <section className="bg-[#0a301d] rounded-[24px] md:rounded-[32px] p-6 sm:p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 max-w-5xl mx-auto w-full text-center md:text-left">
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 md:gap-6">
           <div className="bg-[#1a4a34] w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shrink-0">
             <Heart className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#bcff5f]" fill="#bcff5f" />
           </div>
           <div>
             <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1.5 md:mb-2">Join Our Mission</h3>
             <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-xl">
               Real change happens when compassionate people come together. Whether through donations, volunteering, partnerships, or advocacy, your support can help create opportunities, restore hope, and transform lives.
             </p>
           </div>
        </div>
        <Link to="/donate" className="bg-[#bcff5f] text-[#203600] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold flex items-center justify-center gap-2.5 hover:opacity-90 transition-opacity w-full md:w-auto shrink-0 text-sm md:text-base">
          Support Our Cause <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
        </Link>
      </section>

    </main>
    </>
  );
}
