import React from "react";
import Navbar from "./components/Navbar";
import waste from "../../assets/1.png";
import global from "../../assets/2.png";
import commercial from "../../assets/3.png";
import residential from "../../assets/4.png";
import Footer from "./components/Footer";
import ContactForm from "./components/ContactForm";
import WasteManagementStats from "./components/Testimonial";
import WasteSolutions from "./components/Services";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="">
        <section className="hero bg-gradient-to-tr from-green-500 via-green-700 to-green-800 text-white">
          <div className="container flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left md:w-1/2 px-20">
              <h1 className="text-[70px] font-semibold mb-4 leading-[4.5rem]">
                Digital Garbage Management
              </h1>
              <p className="mb-6">
                We provide innovative solutions to efficiently manage and track
                waste disposal, making our environment cleaner and greener.
              </p>
              <button className="bg-white text-green-600 px-6 py-2 rounded">
                Learn More
              </button>
            </div>
            <div className="md:w-2/3">
              <img
                src="https://plus.unsplash.com/premium_photo-1681488048176-1cd684f6be8a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Garbage Management"
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>
        <section className="waste-management-section py-24 px-[200px] bg-white">
          <div className="">
            <div className="flex w-full justify-between items-center">
              <div className="w-[50%]">
                <h3 className="text-green-600 uppercase font-semibold">
                  About Waste Management
                </h3>
                <h2 className="text-[50px] font-semibold my-4 leading-[3rem]">
                  We are the leaders in innovative waste management solutions.
                </h2>
                <p className="text-gray-500 mb-8">
                  Managing waste effectively requires comprehensive solutions
                  that adapt to various waste streams and environmental
                  challenges. Our approach focuses on sustainability, maximizing
                  resource recovery, and minimizing environmental impact.
                </p>
              </div>

              <div className="bg-green-50 h-fit rounded-lg">
                <p className="text-lg text-gray-700 p-10 font-medium">
                  Pounds of waste diverted from landfills.
                </p>
                <h3 className="text-[3rem] text-center rounded-lg font-bold text-white bg-green-800 p-2">
                  412,000+
                </h3>
              </div>
            </div>
            <br />
            <br />
            <div className="flex justify-between space-x-16">
              <div className="text-center">
                <img
                  src={waste}
                  alt="Waste Solutions Icon"
                  className="mx-auto mb-4 w-16 h-16"
                />
                <h3 className="text-green-800 text-xl font-semibold">
                  Waste Solutions
                </h3>
                <p className="text-gray-600 text-[14px]">
                  Providing tailored solutions for every type of waste, reducing
                  environmental impact.
                </p>
              </div>

              <div className="text-center">
                <img
                  src={global}
                  alt="Global Expertise Icon"
                  className="mx-auto mb-4 w-16 h-16 "
                />
                <h3 className="text-xl font-semibold text-green-800">
                  Global Expertise
                </h3>
                <p className="text-gray-600 text-[14px]">
                  We bring years of global experience to local waste management
                  challenges.
                </p>
              </div>

              <div className="text-center">
                <img
                  src={commercial}
                  alt="Commercial Use Icon"
                  className="mx-auto mb-4 w-16 h-16"
                />
                <h3 className="text-xl font-semibold text-green-800">
                  Commercial Use
                </h3>
                <p className="text-gray-600 text-[14px]">
                  Supporting businesses with sustainable waste disposal and
                  resource recovery services.
                </p>
              </div>

              <div className="text-center">
                <img
                  src={residential}
                  alt="Residential Use Icon"
                  className="mx-auto mb-4 w-16 h-16"
                />
                <h3 className="text-xl font-semibold text-green-800">
                  Residential Use
                </h3>
                <p className="text-gray-600 text-[14px]">
                  Helping households manage waste effectively through convenient
                  recycling and collection.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Features Section */}
        <div className=" text-center w-full text-[250px] xxl:text-[200px] xl:text-[220px] lg:text-[140px] hidden md:block text-transparent bg-clip-text bg-gradient-to-b from-green-600 to-white z-[-2] tracking-[-8px] font-bold animate-fade-up">
          Clean Path
        </div>
        <WasteSolutions />

        {/* Testimonials Section */}
        <WasteManagementStats />

        {/* Contact Section */}
        <ContactForm />
      </div>
      <Footer />
    </>
  );
};

export default Home;
