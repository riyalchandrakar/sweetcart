import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import HeroCardCarousel from "../components/HeroCardCarousel";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8F1]">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-amber-200 via-rose-200 to-amber-100">
        <div
          className="
            max-w-7xl mx-auto
            px-5 sm:px-6
            py-16 sm:py-20 md:py-24
            grid grid-cols-1 md:grid-cols-2
            gap-12 md:gap-14
            items-center
          "
        >

          {/* TEXT */}
          <Motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="
              text-center md:text-left
              flex flex-col items-center md:items-start
            "
          >
            <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl leading-tight mb-4 sm:mb-6 text-[#3B1D14]">
              Fresh & Authentic <br />
              <span className="text-rose-700">Indian Sweets 🍬</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-700 mb-6 sm:mb-8 max-w-lg">
              Handcrafted sweets prepared daily using traditional recipes,
              pure ingredients, and lots of love.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="bg-rose-600 text-white px-8 py-3 rounded-full font-semibold shadow hover:bg-rose-700 transition"
              >
                Order Now
              </Link>

              <Link
                to="/login"
                className="border border-rose-600 text-rose-600 px-8 py-3 rounded-full font-semibold hover:bg-rose-50 transition"
              >
                Login
              </Link>
            </div>
          </Motion.div>

          {/* CAROUSEL */}
          <div
            className="
              hidden sm:flex md:justify-center
              mt-8 md:mt-0
            "
          >
            <HeroCardCarousel />
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-center mb-10 sm:mb-16 text-[#3B1D14]">
            Why Customers Love Us ❤️
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
            {[{ title: "Freshly Made", icon: "🍥" },
              { title: "Pure Ingredients", icon: "🥛" },
              { title: "Fast Delivery", icon: "🚚" },
            ].map((item, i) => (
              <Motion.div
                key={i}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow hover:shadow-xl"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-heading text-lg sm:text-xl text-[#3B1D14] mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base">
                  Quality and taste you can trust.
                </p>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#2E1B12] text-[#F5E9DA] py-6 sm:py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-sm">© 2025 Sweet Shop</p>
          <p className="text-sm opacity-80">
            Crafted with sweetness 🍯
          </p>
        </div>
      </footer>

    </div>
  );
};

export default Landing;
