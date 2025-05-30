"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { homeTexts } from "@/constants/home-texts";

const ContactSection = () => {
  const { contact } = homeTexts;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", phone: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-brand-teal/10 text-brand-teal border-brand-teal/20">
                <span className="ml-2">📞</span>
                {contact.badge}
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                <span className="text-primary">{contact.titleHighlight}</span>
                {contact.title.split(contact.titleHighlight)[1]}
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {contact.description}
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">
                    {contact.methods.phone.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {contact.methods.phone.description}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="p-3 bg-accent/10 rounded-xl">
                  <Mail className="h-6 w-6 text-accent" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">
                    {contact.methods.email.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {contact.methods.email.description}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="p-3 bg-brand-teal/10 rounded-xl">
                  <MapPin className="h-6 w-6 text-brand-teal" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">
                    {contact.methods.visit.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {contact.methods.visit.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-brand-teal/10 rounded-2xl p-6 border">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  {contact.features.title}
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  {contact.features.items.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-2 space-x-reverse"
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          index === 0
                            ? "bg-primary"
                            : index === 1
                            ? "bg-accent"
                            : "bg-brand-teal"
                        }`}
                      ></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card border rounded-2xl p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">
                  {contact.form.title}
                </h3>
                <p className="text-muted-foreground">
                  {contact.form.description}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    {contact.form.fields.name.label}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={contact.form.fields.name.placeholder}
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    {contact.form.fields.phone.label}
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={contact.form.fields.phone.placeholder}
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    {contact.form.fields.email.label}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={contact.form.fields.email.placeholder}
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    {contact.form.fields.message.label}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={contact.form.fields.message.placeholder}
                    className="w-full min-h-[100px]"
                  />
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full text-lg">
                {contact.form.submit}
                <Send className="mr-2 h-5 w-5" />
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                {contact.form.disclaimer}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
