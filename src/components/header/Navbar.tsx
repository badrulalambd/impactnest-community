
"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  LogIn,
  LogOut,
  Menu,
  Moon,
  Sun,
} from "lucide-react";
import { IoIosArrowDown } from "react-icons/io";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import { LuCirclePlus } from "react-icons/lu";
import { MdOutlineSettings } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { useState } from "react";

const NAV_LINKS = [
  {
    href: "/events",
    label: "Upcoming Events",
    icon: CalendarDays,
  },
];

function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Toggle dark mode"
      className="relative rounded-full"
      onClick={() =>
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
      }
    >
      <Sun className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <Moon className="scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    </Button>
  );
}

const Navbar = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Unable to log out.");
        return;
      }

      toast.success("Logout successful!");
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Something went wrong while logging out.");
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 md:grid md:grid-cols-[1fr_auto_1fr]">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="GoodGather home"
        >
          <Image
            src="/ic-logo-desktop.png"
            alt="GoodGather — Community Action"
            width={344}
            height={87}
            priority
            className="h-9 w-auto"
          />
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden h-full items-center gap-1 md:flex"
        >
          {NAV_LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex h-full items-center gap-2 border-b-2 border-transparent px-3 text-sm font-medium text-muted-foreground transition-colors hover:border-brand-orange/60 hover:text-brand-navy"
            >
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Right-side actions */}
        <div className="flex items-center gap-2 justify-self-end">
          <ThemeToggle />

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Open menu"
                  className="rounded-full md:hidden"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>

            <SheetContent side="right" className="gap-6 sm:max-w-xs">
              <SheetHeader className="pb-0">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <nav
                aria-label="Mobile navigation"
                className="flex flex-col gap-1 px-4"
              >
                {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                  <SheetClose
                    key={href}
                    render={
                      <Link
                        href={href}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-brand-navy"
                      />
                    }
                  >
                    <Icon className="size-4" />
                    {label}
                  </SheetClose>
                ))}

                {user ? (
                  <>
                    <div className="my-3 border-t border-border" />

                    <div className="flex items-center gap-3 py-2">
                      <Avatar>
                        <AvatarImage
                          src={user.image ?? undefined}
                          alt={user.name ?? "Profile"}
                          referrerPolicy="no-referrer"
                        />
                        <AvatarFallback>
                          {user.name?.charAt(0) ?? "U"}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {user.name}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="my-3 border-t border-border" />

                    <SheetClose>
                      <Link href="/events/create-event">
                        <Button
                          className="p-5 cursor-pointer w-full justify-start bg-transparent text-foreground shadow-none hover:bg-muted"
                        >
                          <LuCirclePlus className="mr-2 size-4 text-brand-navy" />
                          Create Event
                        </Button>
                      </Link>
                    </SheetClose>
                    <SheetClose>
                      <Link href="/events/manage-events">
                        <Button
                          className="p-5 cursor-pointer w-full justify-start bg-transparent text-foreground shadow-none hover:bg-muted"
                        >
                          <MdOutlineSettings className="mr-2 size-4 text-brand-navy" />
                          Manage Events
                        </Button>
                      </Link>
                    </SheetClose>
                    <SheetClose>
                      <Link href="/events/joined-events">
                        <Button
                          className="p-5 cursor-pointer w-full justify-start bg-transparent text-foreground shadow-none hover:bg-muted"
                        >
                          <FaRegCheckCircle className="mr-2 size-4 text-brand-navy" />
                          Joined Events
                        </Button>
                      </Link>
                    </SheetClose>
                    <SheetClose>
                      <Button
                        onClick={handleLogout}
                        variant="destructive"
                        className="p-5 w-full justify-start cursor-pointer bg-transparent mb-3"
                      >
                        <LogOut className="mr-2 size-4" />
                        Logout
                      </Button>
                    </SheetClose>
                  </>
                ) : (
                  <SheetClose
                    render={
                      <Link
                        href="/login"
                        className="mt-2 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-orange px-3 text-sm font-medium text-white transition-colors hover:bg-brand-orange/90"
                      />
                    }
                  >
                    <LogIn className="size-4" />
                    Login
                  </SheetClose>
                )}
              </nav>
            </SheetContent>
          </Sheet>




          {/* Desktop authentication actions */}
          <div className="hidden md:block">
            {user ? (
              <div className="flex gap-4">
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                  <PopoverTrigger
                    render={
                      <button
                        type="button"
                        aria-label="Open profile menu"
                        className="flex cursor-pointer items-center gap-2 rounded-full p-1 transition-colors hover:bg-muted"
                      >
                        <Avatar>
                          <AvatarImage
                            src={user.image ?? undefined}
                            alt={user.name ?? "Profile"}
                            referrerPolicy="no-referrer"
                          />
                          <AvatarFallback>
                            {<Image src="/profile.jpg" width={125} height={125} alt="Profile"
                              className="rounded-4xl"
                            />}
                          </AvatarFallback>
                        </Avatar>

                        <IoIosArrowDown />
                      </button>
                    }
                  />

                  <PopoverContent align="end" className="w-64 p-0">
                    <PopoverHeader className="px-5 pt-5">
                      <PopoverTitle>
                        {user.name ?? "Your account"}
                      </PopoverTitle>
                      <PopoverDescription>
                        {user.email}
                      </PopoverDescription>
                    </PopoverHeader>

                    {/* Divider */}
                    <div>
                      <div className="h-px flex-1 bg-border" />
                    </div>

                    <Link href="/events/create-event"
                    onClick={() => setIsPopoverOpen(false)}
                    >
                      <Button
                        className="p-5 cursor-pointer w-full justify-start bg-transparent text-foreground shadow-none hover:bg-muted"
                      >
                        <LuCirclePlus className="mr-2 size-4 text-brand-navy" />
                        Create Event
                      </Button>
                    </Link>

                    <Link href="/events/manage-events"
                    onClick={() => setIsPopoverOpen(false)}
                    >
                      <Button
                        className="p-5 cursor-pointer w-full justify-start bg-transparent text-foreground shadow-none hover:bg-muted"
                      >
                        <MdOutlineSettings className="mr-2 size-4 text-brand-navy" />
                        Manage Events
                      </Button>
                    </Link>

                    <Link href="/events/joined-events"
                    onClick={() => setIsPopoverOpen(false)}
                    >
                      <Button
                        className="p-5 cursor-pointer w-full justify-start bg-transparent text-foreground shadow-none hover:bg-muted"
                      >
                        <FaRegCheckCircle className="mr-2 size-4 text-brand-navy" />
                        Joined Events
                      </Button>
                    </Link>

                    {/* Divider */}
                    <div>
                      <div className="h-px flex-1 bg-border" />
                    </div>

                    <Button
                      onClick={handleLogout}
                      variant="destructive"
                      className="p-5 w-full justify-start cursor-pointer bg-transparent mb-3"
                    >
                      <LogOut className="mr-2 size-4" />
                      Logout
                    </Button>
                  </PopoverContent>
                </Popover>
                <Button onClick={handleLogout}
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-brand-orange px-3 text-sm font-medium text-white transition-colors hover:bg-brand-orange/90"
                >
                  <LogOut className="size-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-brand-orange px-3 text-sm font-medium text-white transition-colors hover:bg-brand-orange/90"
              >
                <LogIn className="size-4" />
                Login
              </Link>
            )}
          </div>
   
        </div>
      </div>
    </header>
  );
};

export default Navbar;
