"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import {
  useAnimationOnScroll,
  fadeInUp,
  staggerContainer,
} from "@/hooks/useAnimationOnScroll";

export default function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      text: "Desde que uso a linea nunca mais perdi clientes.",
      author: "João Silva",
      role: "Dono de Barbearia",
      avatar: "👨‍💼",
      rating: 5,
    },
    {
      text: "O custo é muito inferior a ter alguém só para atender chamadas.",
      author: "Maria Santos",
      role: "Gerente de Clínica",
      avatar: "👩‍⚕️",
      rating: 5,
    },
    {
      text: "A IA responde de forma tão natural que os clientes nem notam a diferença.",
      author: "Carlos Oliveira",
      role: "Proprietário de Restaurante",
      avatar: "👨‍🍳",
      rating: 5,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      prev => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section ref={ref} id="testimonials" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            O que dizem os nossos clientes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Veja o que os nossos clientes dizem sobre a Linea
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Cards */}
          <div className="relative h-80 overflow-hidden">
            <AnimatePresence mode="wait">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 100, scale: 0.9 }}
                  animate={{
                    opacity: index === currentIndex ? 1 : 0,
                    x: index === currentIndex ? 0 : 100,
                    scale: index === currentIndex ? 1 : 0.9,
                  }}
                  exit={{ opacity: 0, x: -100, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className={`absolute inset-0 ${
                    index === currentIndex ? "z-10" : "z-0"
                  }`}
                >
                  <motion.div
                    whileHover={{
                      y: -5,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    }}
                    className="card p-8 h-full flex flex-col justify-center"
                  >
                    <div className="text-center">
                      {/* Quote Icon */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={
                          index === currentIndex
                            ? { scale: 1, rotate: 0 }
                            : { scale: 0, rotate: -180 }
                        }
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6"
                      >
                        <Quote className="w-8 h-8 text-white" />
                      </motion.div>

                      {/* Rating */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={
                          index === currentIndex
                            ? { opacity: 1 }
                            : { opacity: 0 }
                        }
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex justify-center space-x-1 mb-6"
                      >
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={
                              index === currentIndex
                                ? { scale: 1, rotate: 0 }
                                : { scale: 0, rotate: -180 }
                            }
                            transition={{
                              duration: 0.3,
                              delay: 0.5 + i * 0.1,
                            }}
                          >
                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* Testimonial Text */}
                      <motion.blockquote
                        initial={{ opacity: 0, y: 20 }}
                        animate={
                          index === currentIndex
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 20 }
                        }
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="text-xl md:text-2xl text-gray-700 italic mb-8 leading-relaxed"
                      >
                        &ldquo;{testimonial.text}&rdquo;
                      </motion.blockquote>

                      {/* Author */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={
                          index === currentIndex
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 20 }
                        }
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="flex items-center justify-center space-x-4"
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="text-4xl"
                        >
                          {testimonial.avatar}
                        </motion.div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            {testimonial.author}
                          </div>
                          <div className="text-gray-600">
                            {testimonial.role}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 z-20"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 z-20"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </motion.button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary-500 w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            className="text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl font-bold text-primary-600 mb-2"
            >
              500+
            </motion.div>
            <div className="text-gray-600">Clientes Satisfeitos</div>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            className="text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="text-4xl font-bold text-secondary-600 mb-2"
            >
              50k+
            </motion.div>
            <div className="text-gray-600">Chamadas Atendidas</div>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            className="text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="text-4xl font-bold text-accent-600 mb-2"
            >
              98%
            </motion.div>
            <div className="text-gray-600">Taxa de Satisfação</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
