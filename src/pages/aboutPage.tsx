import React from 'react';
import { motion } from 'framer-motion';
import { Award, Bookmark, Star, BookText} from 'lucide-react';
 import { FadeIn, Stats, Features, Team, Milestones, ContacfForm } from '../components/aboutData.tsx';

function About() {
  

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <motion.section 
        className="relative pt-32 pb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div {...FadeIn} className="inline-block mb-4">
            <span className="text-chocolate-600 font-medium mb-4 block">Established 2005</span>
            </motion.div>
            <motion.h1 
              {...FadeIn}
              className="text-5xl md:text-6xl font-serif font-bold text-chocolate-500 mb-6"
            >
              More Than Just
              <br />
              A Bookstore
            </motion.h1>
            <motion.p 
              {...FadeIn}
              className="text-xl text-chocolate-400 max-w-3xl mx-auto leading-relaxed"
            >
              Since 2008, Chapters & Pages has been crafting literary experiences that transcend 
              the ordinary. We're not just a bookstore – we're a sanctuary for bibliophiles, 
              a hub for intellectual discourse, and a curator of transformative literary journeys.
            </motion.p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent" />
      </motion.section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {Stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="inline-block p-6 bg-beige-100 rounded-full mb-6 group-hover:bg-chocolate-500 transition-colors duration-300">
                  <stat.icon className="w-10 h-10 text-chocolate-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-3xl font-bold text-chocolate-500 mb-3">{stat.value}</h3>
                <p className="text-chocolate-400 text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-chocolate-500 mb-4">What Makes Us Special</h2>
            <p className="text-xl text-chocolate-400">Discover the unique experiences that set us apart</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="inline-block p-4 bg-beige-100 rounded-full mb-6">
                  <feature.icon className="w-8 h-8 text-chocolate-500" />
                </div>
                <h3 className="text-xl font-serif font-bold text-chocolate-500 mb-4">{feature.title}</h3>
                <p className="text-chocolate-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-chocolate-500/20 to-transparent rounded-xl" />
              <img 
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=1000"
                alt="Library interior"
                className="rounded-xl shadow-2xl relative z-10"
              />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-beige-100 rounded-full z-0" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10"
            >
              <h2 className="text-4xl font-serif font-bold text-chocolate-500 mb-8">Our Mission</h2>
              <div className="space-y-6">
                <p className="text-lg text-chocolate-400 leading-relaxed">
                  At Chapters & Pages, we believe that books have the power to transform lives, 
                  shape perspectives, and build bridges between cultures. Our mission is to create 
                  an inclusive space where literature comes alive and where every reader can find 
                  their next great adventure.
                </p>
                <p className="text-lg text-chocolate-400 leading-relaxed">
                  We carefully curate our collection to ensure that every book on our shelves 
                  has the potential to inspire, educate, or transport our readers to new realms 
                  of imagination. Our commitment to literary excellence drives everything we do.
                </p>
                <div className="flex flex-wrap gap-4 mt-8">
                  <div className="flex items-center space-x-2">
                    <Bookmark className="w-5 h-5 text-chocolate-500" />
                    <span className="text-chocolate-400">Curated Selection</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-chocolate-500" />
                    <span className="text-chocolate-400">Expert Staff</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookText className="w-5 h-5 text-chocolate-500" />
                    <span className="text-chocolate-400">Community Focus</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-chocolate-500 mb-4">Our Journey</h2>
            <p className="text-xl text-chocolate-400">Milestones that shaped who we are today</p>
          </div>
          <div className="relative">
            <div className="absolute top-0 left-1/2 w-0.5 h-full bg-chocolate-300 transform -translate-x-1/2" />
            <div className="space-y-16">
              {Milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  <div className="w-1/2 relative">
                    <div className={`absolute top-0 ${index % 2 === 0 ? 'right-0' : 'left-0'} w-4 h-4 bg-chocolate-500 rounded-full transform translate-x-${index % 2 === 0 ? '1/2' : '-1/2'}`} />
                    <div className={`${index % 2 === 0 ? 'pr-12' : 'pl-12'} bg-white p-6 rounded-xl shadow-lg`}>
                      <span className="text-sm font-bold text-chocolate-400">{milestone.year}</span>
                      <h3 className="text-xl font-serif font-bold text-chocolate-500 mt-2 mb-3">{milestone.title}</h3>
                      <p className="text-chocolate-400">{milestone.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-chocolate-500 mb-4">Meet Our Team</h2>
            <p className="text-xl text-chocolate-400">The passionate individuals behind Chapters & Pages</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {Team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="group"
              >
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-gradient-to-t from-chocolate-500 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300 rounded-xl" />
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-96 object-cover rounded-xl shadow-xl"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-lg font-medium">{member.quote}</p>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-serif font-bold text-chocolate-500 mb-2">{member.name}</h3>
                  <p className="text-lg text-chocolate-400 mb-4">{member.role}</p>
                  <div className="space-y-2">
                    {member.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-center justify-center space-x-2">
                        <Award className="w-4 h-4 text-chocolate-400" />
                        <span className="text-sm text-chocolate-400">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-chocolate-500 mb-4">Visit Us</h2>
            <p className="text-xl text-chocolate-400">We'd love to welcome you to our literary sanctuary</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {ContacfForm.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-center">
                  <div className="inline-block p-4 bg-beige-100 rounded-full mb-6">
                    <contact.icon className="w-8 h-8 text-chocolate-500" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-chocolate-500 mb-6">{contact.title}</h3>
                  <div className="space-y-3">
                    {contact.lines.map((line, i) => (
                      <p key={i} className="text-chocolate-400">{line}</p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}



export default About;