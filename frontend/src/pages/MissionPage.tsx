import { Heart, Globe, Target, Flame, Users, BookOpen, BriefcaseMedical, Baby, ShieldCheck, Home, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export function MissionPage() {
  return (
    <>
      <Helmet>
        <title>Our Mission | Tafheem-ul-Islam Trust</title>
        <meta name="description" content="Tafheem-ul-Islam Trust's mission is to uplift vulnerable individuals through education, healthcare, and humanitarian assistance." />
      </Helmet>
      <main className="flex-grow flex flex-col gap-8 md:gap-20 px-4 sm:px-6 lg:px-20 w-full mx-auto pt-4 md:pt-12 pb-12 md:pb-24">
      {/* Hero Section */}
      <section className="bg-[#0a301d] rounded-[24px] md:rounded-[32px] p-6 sm:p-8 md:p-16 flex flex-col gap-8 md:gap-12 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
          <div className="flex flex-col gap-6 md:gap-8 order-2 lg:order-1">
            <div className="inline-flex items-center px-4 py-1.5 md:py-2 rounded-full border border-green-500/30 w-max text-[#bcff5f] text-xs md:text-sm font-semibold">
              Our Mission
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-[64px] text-white text-left font-bold leading-[1.1] tracking-tight">
              Serving Humanity with <br className="hidden xl:block" /> Compassion, Dignity, and Purpose
            </h1>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-md">
              At Tafheemul Islam Trust, our mission is to uplift vulnerable individuals and communities by providing meaningful support, creating opportunities, and restoring hope. We believe that every person deserves access to education, healthcare, safety, and the chance to build a better future.
            </p>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-md font-light">
              For more than three decades, our work has been guided by a simple principle: humanity comes first. Regardless of religion, caste, ethnicity, or background, we stand with those facing hardship and help them overcome challenges with dignity and respect.
            </p>
          </div>
          
          <div className="relative w-full aspect-square sm:aspect-[4/3] md:aspect-[3/4] lg:aspect-square xl:aspect-[4/3] rounded-[16px] sm:rounded-[24px] overflow-hidden order-1 lg:order-2">
            <img
              alt="Community working together"
              className="w-full h-full object-cover"
              src="https://images.pexels.com/photos/8078401/pexels-photo-8078401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:bottom-6 sm:left-6 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col gap-2 sm:gap-4 shadow-xl max-w-[calc(100%-32px)] sm:max-w-xs">
              <div className="bg-[#e8fccd] w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-[#3d6200]" />
              </div>
              <p className="text-gray-700 font-medium leading-relaxed text-xs sm:text-sm md:text-base">
                Bridging gaps through sustainable programs and humanitarian impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Drives Us */}
      <section className="w-full max-w-5xl mx-auto">
        <div className="bg-gray-50 border border-gray-200 rounded-[24px] md:rounded-[32px] p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col gap-4 md:gap-6 shadow-sm text-center items-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            What Drives Us
          </h2>
          <div className="flex flex-col gap-4 md:gap-6 max-w-3xl">
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Across India, countless families struggle with poverty, lack of education, inadequate healthcare, and unexpected crises. These challenges affect not only individuals but entire communities.
            </p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Our mission is to bridge these gaps through sustainable programs and humanitarian initiatives that create long-term impact rather than temporary relief.
            </p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              We are committed to transforming lives by empowering people with the support, resources, and opportunities they need to thrive.
            </p>
          </div>
        </div>
      </section>

      {/* Our Core Mission Areas */}
      <section className="bg-gray-50 rounded-[24px] md:rounded-[32px] p-6 sm:p-8 md:p-16 flex flex-col gap-8 md:gap-12 border border-gray-200 shadow-sm relative overflow-hidden">
        <div className="text-center max-w-3xl mx-auto z-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Core Mission Areas
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full text-left z-10">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-sm group hover:shadow-md transition-shadow">
            <div className="w-full h-40 md:h-48 rounded-xl overflow-hidden mb-2">
               <img src="https://images.pexels.com/photos/13959931/pexels-photo-13959931.jpeg?auto=compress&cs=tinysrgb&w=800&q=80" alt="Education" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-900">Education for Every Child</h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              We believe education is the foundation of lasting change. Our mission is to help children access quality learning opportunities, educational resources, and the support needed to achieve their full potential.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-sm group hover:shadow-md transition-shadow">
            <div className="w-full h-40 md:h-48 rounded-xl overflow-hidden mb-2">
               <img src="https://images.pexels.com/photos/37234478/pexels-photo-37234478.jpeg?auto=compress&cs=tinysrgb&w=800&q=80" alt="Healthcare" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-900">Healthcare for Those in Need</h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              No family should suffer because they cannot afford essential medical care. We work to support individuals and families facing health challenges by helping them access treatment, care, and medical assistance.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-sm group hover:shadow-md transition-shadow">
            <div className="w-full h-40 md:h-48 rounded-xl overflow-hidden mb-2">
               <img src="https://images.pexels.com/photos/7142505/pexels-photo-7142505.jpeg?auto=compress&cs=tinysrgb&w=800&q=80" alt="Family Support" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-900">Support for Vulnerable Families</h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Many families face financial hardship, social challenges, and uncertain futures. Our mission is to provide assistance that helps restore stability, dignity, and hope.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-sm group hover:shadow-md transition-shadow">
            <div className="w-full h-40 md:h-48 rounded-xl overflow-hidden mb-2">
               <img src="https://images.pexels.com/photos/29851269/pexels-photo-29851269.jpeg?auto=compress&cs=tinysrgb&w=800&q=80" alt="Orphans and Widows" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-900">Care for Orphans and Widows</h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              We are dedicated to supporting some of society's most vulnerable members through welfare programs, financial assistance, and community support initiatives that improve quality of life.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-sm group hover:shadow-md transition-shadow">
            <div className="w-full h-40 md:h-48 rounded-xl overflow-hidden mb-2">
               <img src="https://images.pexels.com/photos/35872865/pexels-photo-35872865.jpeg?auto=compress&cs=tinysrgb&w=800&q=80" alt="Disaster Relief" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-900">Humanitarian and Disaster Relief</h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              In times of crisis, every moment matters. Our mission includes delivering timely assistance to communities affected by natural disasters, emergencies, and unforeseen hardships.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-sm group hover:shadow-md transition-shadow">
            <div className="w-full h-40 md:h-48 rounded-xl overflow-hidden mb-2">
               <img src="https://images.pexels.com/photos/20356942/pexels-photo-20356942.jpeg?auto=compress&cs=tinysrgb&w=800&q=80" alt="Community Empowerment" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-900">Community Empowerment</h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              True progress happens when communities become stronger and more self-reliant. We work to promote sustainable development, social welfare, and initiatives that create lasting positive change.
            </p>
          </div>
        </div>
      </section>

      {/* Our Commitment & Vision */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        <div className="bg-white border border-gray-200 shadow-sm rounded-[24px] md:rounded-[32px] p-0 flex flex-col overflow-hidden">
          <div className="w-full h-48 sm:h-64 overflow-hidden">
            <img src="https://images.pexels.com/photos/13959931/pexels-photo-13959931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Vision for the future" className="w-full h-full object-cover" />
          </div>
          <div className="p-6 sm:p-8 md:p-12 flex flex-col gap-4 md:gap-6">
            <h2 className="font-display text-3xl md:text-3xl font-bold text-gray-900">
              Our Vision for the Future
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              We envision a future where every child can learn, every family can live with dignity, every individual has access to essential support, and communities can grow stronger together.
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              As we expand our reach across India, our commitment remains unchanged: to serve with integrity, compassion, and a genuine desire to make a difference in the lives of those who need it most.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-[24px] md:rounded-[32px] p-6 sm:p-8 md:p-12 border border-gray-200 shadow-sm flex flex-col gap-6 md:gap-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
            Our Commitment
          </h2>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm h-full">
            <p className="text-gray-600 text-base sm:text-lg mb-6">We are committed to:</p>
            <ul className="flex flex-col gap-4 text-gray-600 text-base sm:text-lg">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#12372a] shrink-0 mt-0.5" />
                <span>Serving humanity without discrimination</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#12372a] shrink-0 mt-0.5" />
                <span>Maintaining transparency and accountability</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#12372a] shrink-0 mt-0.5" />
                <span>Using donations responsibly and effectively</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#12372a] shrink-0 mt-0.5" />
                <span>Creating sustainable and measurable impact</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#12372a] shrink-0 mt-0.5" />
                <span>Promoting compassion, unity, and social responsibility</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#12372a] shrink-0 mt-0.5" />
                <span>Empowering individuals to build better futures</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Join Us in Creating Change / CTA */}
      <section className="bg-[#0a301d] rounded-[24px] md:rounded-[32px] p-6 sm:p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 max-w-5xl mx-auto w-full text-center md:text-left relative overflow-hidden">
        
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 md:gap-6 relative z-10">
           <div className="bg-[#1a4a34] w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shrink-0">
             <Heart className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#bcff5f]" fill="#bcff5f" />
           </div>
           <div>
             <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1.5 md:mb-2">Join Us in Creating Change</h3>
             <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-xl">
               Every act of kindness has the power to transform a life. Whether you choose to donate, volunteer, partner with us, or advocate for our cause, your support helps bring hope, opportunity, and positive change to communities across India.
             </p>
           </div>
        </div>
        <Link to="/donate" className="bg-[#bcff5f] text-[#203600] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold flex items-center justify-center gap-2.5 hover:opacity-90 transition-opacity w-full md:w-auto shrink-0 text-sm md:text-base relative z-10">
          Make a Difference <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
        </Link>
      </section>

    </main>
    </>
  );
}
