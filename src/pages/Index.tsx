import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/Layout';
import { Shield, Truck, RotateCcw, Sparkles } from 'lucide-react';
import kjLogo from '@/assets/kj-logo.png';
import heroBackground from '@/assets/hero-background.png';
import ringImage from '@/assets/ring.jpg';
import braceletImage from '@/assets/bracelet.jpg';
import pendantImage from '@/assets/pendant.jpg';
import modelImage from '@/assets/model-image.png';

const Index = () => {
  const collections = [
    {
      name: 'Rings',
      image: ringImage,
      href: '/gold?category=ring'
    },
    {
      name: 'Pendant',
      image: pendantImage,
      href: '/gold?category=pendant'
    },
    {
      name: 'Bracelet',
      image: braceletImage,
      href: '/gold?category=bracelet'
    }
  ];

  const features = [
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: 'Free Cleaning',
      description: 'Complimentary cleaning service'
    },
    {
      icon: <RotateCcw className="h-5 w-5" />,
      title: 'Lifetime Polishing',
      description: 'Professional polishing for life'
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: 'BIS Hallmarked',
      description: 'Certified quality guarantee'
    },
    {
      icon: <Truck className="h-5 w-5" />,
      title: 'Secure Shipping',
      description: 'Safe and insured delivery'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section 
        className="relative min-h-screen overflow-hidden flex items-center justify-center"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        aria-label="Luxury jewelry collection hero banner"
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/45"></div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center lg:text-right">
          <div className="max-w-2xl mx-auto lg:mx-0 lg:ml-auto space-y-8">
            <div className="space-y-4">
              <h1 className="heading-display text-5xl lg:text-7xl">
                NEW KALYANI<br />JEWELLERS
              </h1>
              <p className="text-2xl lg:text-3xl font-cormorant font-medium text-gold-subtle">
                CROWN YOURSELF
              </p>
            </div>
            
            <div className="space-y-4">
              <Button 
                asChild
                size="lg" 
                className="bg-gold-gradient hover:shadow-gold text-black font-semibold px-8 py-6 text-lg"
              >
                <Link to="/gold">Explore Collection</Link>
              </Button>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-end">
                <Button 
                  asChild
                  variant="outline" 
                  size="lg"
                  className="border-gold/30 text-gold hover:bg-gold/10 bg-black/20 backdrop-blur-sm"
                >
                  <Link to="/custom-designs">Custom Designs</Link>
                </Button>
                <Button 
                  asChild
                  variant="outline" 
                  size="lg"
                  className="border-gold/30 text-gold hover:bg-gold/10 bg-black/20 backdrop-blur-sm"
                >
                  <Link to="/repairs">Repairs</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Collections Section */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-luxury text-4xl lg:text-5xl mb-4">Our Collections</h2>
            <div className="gold-line w-24 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {collections.map((collection) => (
              <Card key={collection.name} className="group hover-gold surface-elevated border-border overflow-hidden">
                <Link to={collection.href} className="block">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={collection.image} 
                      alt={collection.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-cormorant font-semibold text-gold">
                      {collection.name}
                    </h3>
                  </div>
                </Link>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              asChild
              variant="outline"
              size="lg"
              className="border-gold/30 text-gold hover:bg-gold/10"
            >
              <Link to="/offers">View Offers</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="heading-luxury text-4xl lg:text-5xl">
                CRAFTING BEAUTY<br />SINCE 1987
              </h2>
              <div className="gold-line w-16"></div>
              <p className="text-elegant text-lg leading-relaxed">
                Founded in 1987 in the heart of Kaduwela, Kalyani Jewellers is a name 
                synonymous with trust and superior craftsmanship. Our journey began with 
                a simple vision: to create timeless pieces that celebrate life's most 
                precious moments.
              </p>
              <p className="text-elegant text-lg leading-relaxed">
                For over three decades, we have been crafting exquisite jewelry that 
                combines traditional artistry with contemporary design, ensuring each 
                piece tells a unique story.
              </p>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden">
                <img 
                  src={modelImage} 
                  alt="We Bring The Charm" 
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 text-gold mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-cormorant font-semibold text-lg text-gold">
                  {feature.title}
                </h3>
                <p className="text-elegant text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
