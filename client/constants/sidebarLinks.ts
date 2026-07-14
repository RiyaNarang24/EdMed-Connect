import {
  LayoutDashboard,
  Building2,
  Building,
  UserRoundCog,
  BedDouble,
  DoorOpen,
  Hospital,
  Users,
  CalendarDays,
  UserCog,
} from "lucide-react";

export const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Hospitals",
    href: "/hospitals",
    icon: Building2,
  },
  {
  title: "Hospital Admins",
  href: "/hospital-admins",
  icon: UserCog,
},
  {
    title: "Departments",
    href: "/departments",
    icon: Building,
  },
  {
  title: "Doctors",
  href: "/doctors",
  icon: UserRoundCog,
},
  {
    title: "Wards",
    href: "/wards",
    icon: Hospital,
  },
  {
    title: "Rooms",
    href: "/rooms",
    icon: DoorOpen,
  },
  {
    title: "Beds",
    href: "/beds",
    icon: BedDouble,
  },
  {
    title: "Patients",
    href: "/patients",
    icon: Users,
  },
  {
    title: "Appointments",
    href: "/appointments",
    icon: CalendarDays,
  },
];