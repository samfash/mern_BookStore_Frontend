import { 
    BookOpen, Heart, Users, Globe,MapPin, Phone, Mail,
    BookMarked, Coffee, Calendar, Award,
  } from 'lucide-react';

const FadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const Stats = [
    { icon: BookOpen, value: '50,000+', label: 'Curated Books' },
    { icon: Users, value: '25,000+', label: 'Community Members' },
    { icon: Heart, value: '15+', label: 'Years of Excellence' },
    { icon: Globe, value: '100+', label: 'Publishing Partners' },
  ];

  const Features = [
    {
      icon: BookMarked,
      title: 'Curated Selection',
      description: 'Every book in our collection is hand-picked by our expert curators, ensuring quality and diversity in our offerings.'
    },
    {
      icon: Coffee,
      title: 'Reading Café',
      description: 'Our in-house café serves artisanal coffee and pastries, creating the perfect atmosphere for reading and contemplation.'
    },
    {
      icon: Calendar,
      title: 'Literary Events',
      description: 'Regular author meetups, book clubs, and literary workshops that bring our community together.'
    },
    {
      icon: Award,
      title: 'Expert Guidance',
      description: 'Our knowledgeable staff provides personalized recommendations based on your reading preferences.'
    }
  ];

  const Team = [
    {
      name: 'Sarah Mitchell',
      role: 'Founder & Head Curator',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400',
      quote: 'Books have the power to transform lives. Our mission is to make that transformation accessible to everyone.',
      achievements: ['Literary Excellence Award 2024', '15 Years in Publishing', 'TEDx Speaker']
    },
    {
      name: 'David Chen',
      role: 'Literary Events Director',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
      quote: 'Creating spaces where readers can connect and share their love for literature is what drives us.',
      achievements: ['Community Builder Award', '500+ Events Organized', 'Published Author']
    },
    {
      name: 'Emma Thompson',
      role: 'Head of Curation',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=400',
      quote: 'Every book in our collection is hand-picked with our readers in mind.',
      achievements: ['Master in Library Science', 'Book Critics Circle Member', 'Literature Podcast Host']
    }
  ];

  const Milestones = [
    { year: '2008', title: 'Our Beginning', description: 'Opened our first boutique bookstore in the heart of the city.' },
    { year: '2012', title: 'Community Growth', description: 'Launched our signature literary events program.' },
    { year: '2015', title: 'Digital Evolution', description: 'Introduced our online platform and reading recommendations system.' },
    { year: '2018', title: 'Expansion', description: 'Opened three new locations and launched our mobile library initiative.' },
    { year: '2020', title: 'Virtual Connect', description: 'Pioneered virtual book clubs and author meetups.' },
    { year: '2025', title: 'Present Day', description: 'Celebrating our community of 25,000+ readers and growing.' }
  ];
  const ContacfForm = [
    {
      icon: MapPin,
      title: "Our Location",
      lines: [
        "123 Book Lane",
        "Literary District",
        "LT 12345",
        "Free parking available"
      ]
    },
    {
      icon: Phone,
      title: "Contact Us",
      lines: [
        "(555) 123-4567",
        "Mon - Fri: 9am - 9pm",
        "Sat - Sun: 10am - 8pm",
        "24/7 Online Support"
      ]
    },
    {
      icon: Mail,
      title: "Get in Touch",
      lines: [
        "hello@chaptersandpages.com",
        "events@chaptersandpages.com",
        "Response within 24 hours",
        "Newsletter subscription available"
      ]
    }
  ]

export { FadeIn, Stats, Features, Team, Milestones, ContacfForm };