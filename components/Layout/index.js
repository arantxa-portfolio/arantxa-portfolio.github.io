import { useRouter } from "next/router";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { AnimatePresence, motion } from "framer-motion";

export function Layout({ children }) {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div
          key={router.route}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.5,
          }}
        >
          <main>{children}</main>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </>
  );
}
