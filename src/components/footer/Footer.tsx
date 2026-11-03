
import Link from "next/link";
import {
  Heart,
  ArrowUpRight,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const exploreLinks = [
    { label: "Home", href: "/" },
    { label: "All Events", href: "/events" },
    { label: "Upcoming Events", href: "/events" },
    { label: "Community Gallery", href: "/events" },
  ];

  const communityLinks = [
    { label: "Create an Event", href: "/events/create-event" },
    { label: "Manage Events", href: "/events/manage-events" },
    { label: "Joined Events", href: "/events/joined-events" },
  ];

  const supportLinks = [
    { label: "Contact Us", href: "mailto:hello@example.com" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
  ];

  const socialLinks = [
    {
      label: "Facebook",
      href: "https://facebook.com",
      icon: FaFacebookF,
    },
    {
      label: "Instagram",
      href: "https://instagram.com",
      icon: FaInstagram,
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com",
      icon: FaLinkedinIn,
    },
    {
      label: "GitHub",
      href: "https://github.com",
      icon: FaGithub,
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#062B4F] text-white">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#FF7900]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-[#4DAB2B]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Main footer */}
        <div className="grid grid-cols-1 gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:py-20">
          {/* Brand and social links */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF7900] shadow-lg shadow-orange-950/20">
                <Heart
                  size={25}
                  strokeWidth={2.5}
                  className="fill-white text-white"
                />
              </span>

              <span className="text-2xl font-extrabold tracking-tight">
                Community<span className="text-[#FF7900]">Hub</span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-300">
              Bringing people together to make a difference. Discover
              community events, connect with passionate people, and turn
              meaningful ideas into real-world impact.
            </p>

            <div className="mt-6 space-y-3">
              <a
                href="mailto:hello@example.com"
                className="group inline-flex items-center gap-3 text-sm text-slate-300 transition-colors hover:text-white"
              >
                <Mail
                  size={17}
                  className="text-[#FF7900]"
                />
                hello@example.com
              </a>

              <p className="flex items-center gap-3 text-sm text-slate-300">
                <MapPin size={17} className="text-[#FF7900]" />
                Building stronger communities together
              </p>
            </div>

            {/* Social media icons */}
            <div className="mt-7">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                Follow our community
              </p>

              <div className="flex items-center gap-3">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-300 hover:-translate-y-1 hover:border-[#FF7900] hover:bg-[#FF7900]"
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Explore links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.16em] text-white">
              Explore
            </h3>

            <ul className="space-y-4">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-[#FF7900]"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community links */}
          <div className="lg:col-span-2">
            <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.16em] text-white">
              Community
            </h3>

            <ul className="space-y-4">
              {communityLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-[#FF7900]"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div className="lg:col-span-2">
            <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.16em] text-white">
              Support
            </h3>

            <ul className="space-y-4">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-[#FF7900]"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Community call to action */}
        <div className="mb-10 flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.05] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h3 className="text-xl font-bold sm:text-2xl">
              Have an idea that can make a difference?
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Bring people together and turn your idea into meaningful action.
            </p>
          </div>

          <Link
            href="/events/create-event"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#FF7900] px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-950/30"
          >
            Start a Community Drive
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-slate-400">
            © {currentYear} CommunityHub. All rights reserved.
          </p>

          <p className="flex items-center gap-2 text-slate-400">
            Made with
            <Heart size={15} className="fill-[#FF7900] text-[#FF7900]" />
            for stronger communities.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
