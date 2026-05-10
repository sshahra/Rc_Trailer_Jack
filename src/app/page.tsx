import Image from "next/image";
import {
  BatteryCharging,
  Bluetooth,
  BrainCircuit,
  Camera,
  CheckCircle2,
  CircuitBoard,
  Cpu,
  Download,
  ExternalLink,
  Gauge,
  GraduationCap,
  Hammer,
  Joystick,
  Medal,
  MoveRight,
  Play,
  Radio,
  Route,
  ShieldCheck,
  Sparkles,
  Smartphone,
  TimerReset,
  Trophy,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { CommandConsole } from "@/components/CommandConsole";
import { TrailerJackModel } from "@/components/TrailerJackModel";

const assetBase = "/rc-trailer-jack";
const fullVideoUrl = "https://youtu.be/kuPE9fip_WY";
const fullVideoEmbedUrl = "https://www.youtube.com/embed/kuPE9fip_WY";

type ProjectStat = {
  value: string;
  label: string;
  detail: string;
};

type ComponentItem = {
  name: string;
  role: string;
  detail: string;
  icon: LucideIcon;
  accent: string;
};

type ResultItem = {
  target: string;
  outcome: string;
  detail: string;
};

type DocumentItem = {
  title: string;
  href: string;
  detail: string;
  fileType: string;
};

const stats: ProjectStat[] = [
  {
    value: "1st",
    label: "KEEN Award",
    detail: "Competition-winning MVP and project presentation",
  },
  {
    value: "1 mph",
    label: "Target Speed",
    detail: "Validated during mock and full-scale trailer testing",
  },
  {
    value: "~600 lb",
    label: "Trailer Load Test",
    detail: "Moved a loaded full-scale trailer plus trailer weight",
  },
  {
    value: "500 ms",
    label: "Safety Watchdog",
    detail: "ESP32 stops motors if command heartbeat is lost",
  },
];

const problemPoints = [
  "Manual trailer positioning is physically demanding and can create injury risk.",
  "Hitching often requires a second person or repeated back-and-forth vehicle movement.",
  "Tight spaces, weather, and poor visibility make precise alignment harder.",
];

const solutionPoints = [
  "Smartphone app controls steering, throttle, brake, and gear selection.",
  "BLE sends low-latency motor commands to a dedicated ESP32 controller.",
  "A separate ESP32-CAM provides a live rear-view feed for safer maneuvering.",
];

const signalTerms = [
  "BLE control",
  "ESP32 watchdog",
  "Jetpack Compose",
  "24 VDC drive",
  "200 ms heartbeat",
  "500 ms safety stop",
  "Live camera feed",
  "Tank-drive steering",
];

const navLinks = [
  { href: "#overview", label: "Overview" },
  { href: "#demo", label: "Demo" },
  { href: "#architecture", label: "Architecture" },
  { href: "#project-poster", label: "Poster" },
  { href: "#software", label: "Software" },
  { href: "#hardware", label: "Hardware" },
  { href: "#testing", label: "Testing" },
  { href: "#team", label: "Team" },
  { href: "#future", label: "Future" },
  { href: "#documents", label: "Docs" },
];

const softwareFeatures: ComponentItem[] = [
  {
    name: "Android Controller",
    role: "Kotlin / Jetpack Compose",
    detail:
      "Hold-to-drive controls, P/N/R/D gear selection, live TX/RX status, and camera background.",
    icon: Smartphone,
    accent: "text-[#176b87]",
  },
  {
    name: "BLE Command Link",
    role: "200 ms heartbeat",
    detail:
      "Packets use S:<dir>;T:<throttle>;G:<gear>;B:<brake> for steering, throttle, gear, and brake.",
    icon: Bluetooth,
    accent: "text-[#6b5dd3]",
  },
  {
    name: "Safety Logic",
    role: "500 ms watchdog",
    detail:
      "Brake, BLE disconnect, app freeze, or out-of-range behavior all drive the system to a motor stop.",
    icon: ShieldCheck,
    accent: "text-[#2f855a]",
  },
  {
    name: "Smooth Drive Feel",
    role: "Throttle ramp",
    detail:
      "The app ramps from 8 percent to the target throttle and ramps down on release for controlled motion.",
    icon: Gauge,
    accent: "text-[#b45309]",
  },
];

const hardwareComponents: ComponentItem[] = [
  {
    name: "Haul-Master Trailer Jack",
    role: "Load-bearing frame",
    detail:
      "A standard swing-away trailer jack gives the prototype a real trailer interface and towing storage position.",
    icon: Wrench,
    accent: "text-[#176b87]",
  },
  {
    name: "CIM 24 VDC Geared Motors",
    role: "Dual drive actuation",
    detail:
      "Oversized high-torque motors provide margin for drivetrain losses, starting torque, and surface variation.",
    icon: Zap,
    accent: "text-[#c2410c]",
  },
  {
    name: "Cytron SmartDriveDuo MDDS30",
    role: "Motor power control",
    detail:
      "A compact dual-channel driver independently controls both motors with PWM and direction input.",
    icon: Cpu,
    accent: "text-[#4f46e5]",
  },
  {
    name: "ESP-WROOM-32",
    role: "Wireless control brain",
    detail:
      "The ESP32 provides BLE, Wi-Fi capability, flexible I/O, PWM control, and real-time command handling.",
    icon: CircuitBoard,
    accent: "text-[#047857]",
  },
  {
    name: "24 V Battery System",
    role: "Motor supply",
    detail:
      "Two 12 V deep-cycle batteries in series power the motors while a step-down converter feeds the controller.",
    icon: BatteryCharging,
    accent: "text-[#a16207]",
  },
  {
    name: "Weatherproof Enclosure",
    role: "Electronics protection",
    detail:
      "The control electronics are mounted in a protected junction box for outdoor senior-design testing.",
    icon: Hammer,
    accent: "text-[#525252]",
  },
];

const results: ResultItem[] = [
  {
    target: "Move at least 500 lb",
    outcome: "Success",
    detail:
      "The full-scale trailer test moved roughly 600 lb of added load plus trailer weight.",
  },
  {
    target: "Move at approximately 1 mph",
    outcome: "Success",
    detail:
      "Both mock trailer and full-scale trailer testing reached the desired low-speed motion.",
  },
  {
    target: "Operate for at least 10 minutes",
    outcome: "Success",
    detail:
      "The hardware met the continuous duty-cycle target during design verification.",
  },
  {
    target: "Communicate at 30 ft",
    outcome: "Success",
    detail:
      "The smartphone-to-microcontroller wireless control target was met during testing.",
  },
  {
    target: "Use only 12 VDC supply",
    outcome: "Explained miss",
    detail:
      "The team used available batteries in series for 24 VDC, improving margin while reducing project cost.",
  },
  {
    target: "Bolt to straight tongue trailers",
    outcome: "Success",
    detail:
      "The prototype uses a standard tongue-style trailer jack interface and can be stored for towing.",
  },
];

const documents: DocumentItem[] = [
  {
    title: "Poster Image",
    href: `${assetBase}/project-poster.jpg`,
    detail:
      "New Slide 1 poster image shown on the website as the project poster.",
    fileType: "JPG",
  },
  {
    title: "Final Report",
    href: `${assetBase}/senior-design-final-report.docx`,
    detail:
      "Complete senior design report with requirements, design, testing, and references.",
    fileType: "DOCX",
  },
  {
    title: "Final Presentation",
    href: `${assetBase}/senior-design-final-presentation.pdf`,
    detail:
      "Recruiter-friendly presentation deck covering need, design, testing, and future work.",
    fileType: "PDF",
  },
  {
    title: "Presentation Source",
    href: `${assetBase}/senior-design-final-presentation.pptx`,
    detail: "Editable PowerPoint version of the final senior design presentation.",
    fileType: "PPTX",
  },
  {
    title: "Project Poster",
    href: `${assetBase}/senior-design-poster.pptx`,
    detail:
      "Poster source from the senior design showcase and KEEN competition context.",
    fileType: "PPTX",
  },
  {
    title: "Software Slides",
    href: `${assetBase}/software-slides.pptx`,
    detail:
      "Focused breakdown of the Android, BLE motor ESP32, and ESP32-CAM software system.",
    fileType: "PPTX",
  },
  {
    title: "Competition Deck",
    href: `${assetBase}/competition-presentation.pptx`,
    detail: "Condensed pitch deck for the RC Trailer Jack competition presentation.",
    fileType: "PPTX",
  },
];

const futureWork = [
  {
    title: "Self-Parking Mode",
    detail:
      "Use an additional camera and ML model to support automatic trailer positioning.",
    icon: BrainCircuit,
  },
  {
    title: "Auto-Hitch Alignment",
    detail:
      "Add sensing and control routines to align the trailer with the tow vehicle.",
    icon: Route,
  },
  {
    title: "Multi-Trailer Fit",
    detail:
      "Redesign attachment hardware for broader compatibility across trailer styles.",
    icon: Wrench,
  },
  {
    title: "Compact Powertrain",
    detail:
      "Reduce battery size and improve horizontal motor placement for packaging.",
    icon: BatteryCharging,
  },
];

function SectionHeading({
  eyebrow,
  title,
  inverse = false,
  children,
}: {
  eyebrow: string;
  title: string;
  inverse?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p
        className={`text-sm font-semibold uppercase ${
          inverse ? "text-[#f6c453]" : "text-[#a75518]"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-3 text-3xl font-semibold md:text-5xl ${
          inverse ? "text-white" : "text-[#191714]"
        }`}
      >
        {title}
      </h2>
      {children ? (
        <p
          className={`mt-5 text-base leading-7 md:text-lg ${
            inverse ? "text-white/75" : "text-[#55514a]"
          }`}
        >
          {children}
        </p>
      ) : null}
    </div>
  );
}

function IconBadge({
  icon: Icon,
  label,
  className = "",
}: {
  icon: LucideIcon;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 bg-white text-[#191714] shadow-sm ${className}`}
      title={label}
      aria-label={label}
    >
      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
    </span>
  );
}

function ArrowStep({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase text-[#6a6258] md:flex-col">
      <MoveRight className="h-5 w-5 md:rotate-90" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#08111f] text-[#191714]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#07111f]/88 text-white shadow-lg shadow-black/20 backdrop-blur-xl">
        <nav
          className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-5 sm:px-8 lg:px-10"
          aria-label="Section navigation"
        >
          <a
            href="#home"
            className="shrink-0 text-sm font-semibold tracking-wide text-[#f6c453]"
          >
            RC Trailer Jack
          </a>
          <div className="h-5 w-px shrink-0 bg-white/15" />
          <div
            className="no-scrollbar flex flex-1 items-center gap-1 overflow-x-auto"
            style={{ scrollbarWidth: "none" }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-300 transition hover:bg-cyan-300/10 hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f6c453]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <section
        id="home"
        className="relative scroll-mt-14 overflow-hidden bg-[#08111f] px-5 pb-10 pt-24 text-white sm:px-8 lg:px-10"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(34,211,238,0.22),transparent_32%),linear-gradient(135deg,#08111f_0%,#10243d_50%,#161022_100%)]" />
        <div className="pointer-events-none absolute inset-0 electric-grid opacity-35" />

        <div className="relative mx-auto grid min-h-[calc(88svh-3.5rem)] w-full max-w-7xl content-end gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:pt-8">
          <div className="max-w-3xl">
            <p className="flex max-w-full flex-wrap items-center gap-2 text-sm font-semibold uppercase text-[#f6c453]">
              <Trophy className="h-4 w-4" aria-hidden="true" />
              <span className="sm:hidden">UT EECS · KEEN Award</span>
              <span className="hidden sm:inline">University of Toledo EECS</span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">KEEN Award Winner</span>
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[1.02] md:text-7xl">
              RC Trailer Jack
            </h1>
            <p className="mt-6 max-w-[21rem] text-lg leading-8 text-white/90 sm:max-w-2xl md:text-2xl md:leading-9">
              A smartphone-controlled trailer wheel system that replaces manual
              cranking with BLE motor control, live camera feedback, and
              safety-first embedded logic.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#demo"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#f6c453] px-5 py-3 font-semibold text-[#191714] transition hover:bg-[#ffd777]"
              >
                <Play className="h-5 w-5" aria-hidden="true" />
                Watch Demo
              </a>
              <a
                href="#full-video"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/45 px-5 py-3 font-semibold text-white transition hover:bg-white/[0.12]"
              >
                <ExternalLink className="h-5 w-5" aria-hidden="true" />
                Full Project Video
              </a>
            </div>
            <div className="mt-7 flex max-w-[21rem] flex-wrap gap-2 sm:max-w-2xl">
              {[
                { short: "BLE", full: "BLE linked" },
                { short: "Camera", full: "Camera live" },
                { short: "Watchdog", full: "Watchdog armed" },
              ].map((item) => (
                <span
                  key={item.full}
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-200/25 bg-cyan-200/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-100 backdrop-blur"
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.9)]" />
                  <span className="sm:hidden">{item.short}</span>
                  <span className="hidden sm:inline">{item.full}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="relative h-[360px] overflow-hidden rounded-lg border border-cyan-200/25 bg-[radial-gradient(circle_at_55%_28%,rgba(147,197,253,0.2),transparent_32%),linear-gradient(145deg,rgba(10,23,40,0.98),rgba(18,33,51,0.96)_50%,rgba(8,17,31,0.98))] shadow-2xl shadow-cyan-950/45 sm:h-[460px] lg:h-[590px]">
            <TrailerJackModel src={`${assetBase}/trailer-jack.glb`} />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="hover-lift rounded-lg border border-white/20 bg-white/[0.12] p-4 text-white backdrop-blur"
              >
                <p className="text-3xl font-semibold text-[#f6c453]">
                  {stat.value}
                </p>
                <p className="mt-1 font-semibold">{stat.label}</p>
                <p className="mt-2 text-sm leading-6 text-white/75">
                  {stat.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="signal-strip py-3 text-[#f8f6f1]">
        <div className="marquee-track gap-3">
          {[...signalTerms, ...signalTerms].map((term, index) => (
            <span
              key={`${term}-${index}`}
              className="mx-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-cyan-100"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#f6c453]" aria-hidden="true" />
              {term}
            </span>
          ))}
        </div>
      </div>

      <section
        id="overview"
        className="relative scroll-mt-14 overflow-hidden border-b border-cyan-300/10 bg-[linear-gradient(135deg,#08111f,#10243d,#23153d)] px-5 py-16 text-white animated-gradient sm:px-8 lg:px-10"
      >
        <div className="absolute inset-0 electric-grid opacity-35" />
        <div className="relative mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase text-[#f6c453]">
              Project Snapshot
            </p>
            <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
              One person, precise control, less strain.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Trailer owners often fight tight spaces, poor visibility, and
              physically demanding positioning. This prototype turns the trailer
              jack into a remotely controlled drive system operated from a
              phone.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="hover-lift rounded-lg border border-white/10 bg-white/[0.08] p-5 backdrop-blur">
              <IconBadge icon={Hammer} label="Problem" className="text-[#a75518]" />
              <h3 className="mt-4 text-xl font-semibold">The Burden</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                {problemPoints.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-lg bg-[#d14f2a]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hover-lift rounded-lg border border-white/10 bg-white/[0.08] p-5 backdrop-blur">
              <IconBadge
                icon={Joystick}
                label="Solution"
                className="text-[#176b87]"
              />
              <h3 className="mt-4 text-xl font-semibold">The Solution</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                {solutionPoints.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-lg bg-[#176b87]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="demo" className="relative scroll-mt-14 overflow-hidden px-5 py-20 sm:px-8 lg:px-10">
        <div className="absolute inset-0 electric-grid opacity-25" />
        <div className="relative mx-auto max-w-7xl">
          <SectionHeading eyebrow="Demo" title="Watch the prototype move" inverse>
            A short local demo shows the system in action. The full project
            video is embedded below from YouTube so the site stays fast.
          </SectionHeading>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="overflow-hidden rounded-lg border border-black/10 bg-[#191714] shadow-sm">
              <video
                className="aspect-video w-full object-cover"
                controls
                preload="metadata"
                // poster={`${assetBase}/prototype-lab.jpg`}
              >
                <source src={`${assetBase}/demo-video.mp4`} type="video/mp4" />
              </video>
            </div>
            <div className="flex flex-col justify-between gap-6 rounded-lg border border-black/10 bg-white p-6">
              <div>
                <IconBadge icon={Camera} label="Camera-assisted interface" />
                <h3 className="mt-4 text-2xl font-semibold">
                  Camera-assisted control
                </h3>
                <p className="mt-4 leading-7 text-[#55514a]">
                  The app combines live camera feedback with hold-to-drive
                  controls, giving the operator steering, throttle, brake, gear,
                  and connection status from a single screen.
                </p>
              </div>
              <Image
                src={`${assetBase}/app-interface.jpg`}
                alt="Android control app showing trailer camera view, BLE status, throttle, brake, and gear controls."
                width={2048}
                height={945}
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="rounded-lg border border-black/10"
              />
            </div>
          </div>

          <div
            id="full-video"
            className="mt-8 grid gap-6 rounded-lg border border-black/10 bg-white p-5 lg:grid-cols-[1fr_0.35fr] lg:p-6"
          >
            <div className="overflow-hidden rounded-lg border border-black/10 bg-[#111111]">
              <iframe
                title="RC Trailer Jack full project video on YouTube"
                src={fullVideoEmbedUrl}
                className="aspect-video w-full"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold uppercase text-[#a75518]">
                Full Project Video
              </p>
              <h3 className="mt-3 text-2xl font-semibold">
                Long-form walkthrough
              </h3>
              <p className="mt-4 leading-7 text-[#55514a]">
                The long video plays from YouTube so the 541 MB local file does
                not get bundled into the website. If the inline player is
                blocked by browser permissions, open the same video directly.
              </p>
              <a
                href={fullVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-[#191714] px-4 py-3 font-semibold text-white transition hover:bg-[#3a342e]"
              >
                <ExternalLink className="h-5 w-5" aria-hidden="true" />
                Open on YouTube
              </a>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="text-white">
              <p className="text-sm font-semibold uppercase text-[#f6c453]">
                Interactive
              </p>
              <h3 className="mt-3 text-3xl font-semibold md:text-4xl">
                Try the command loop
              </h3>
              <p className="mt-4 leading-7 text-slate-300">
                Recruiters and students can play with the control idea directly:
                set gear, steering, throttle, and brake to see the BLE command
                packet update in real time.
              </p>
            </div>
            <CommandConsole />
          </div>
        </div>
      </section>

      <section
        id="architecture"
        className="relative scroll-mt-14 overflow-hidden bg-[linear-gradient(135deg,#08111f,#0f2c35,#201334)] px-5 py-20 animated-gradient sm:px-8 lg:px-10"
      >
        <div className="absolute inset-0 electric-grid opacity-25" />
        <div className="relative mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Architecture"
            title="Two wireless systems, one control loop"
            inverse
          >
            Motor control and video streaming are split across dedicated ESP32
            systems so command responsiveness stays separate from camera
            bandwidth.
          </SectionHeading>

          <div className="mt-12 rounded-2xl border border-cyan-300/20 bg-white/[0.95] p-5 shadow-2xl shadow-cyan-950/30 md:p-8">
            <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch">
              <div className="hover-lift rounded-lg border border-black/10 bg-[#f8f6f1] p-5">
                <IconBadge icon={Smartphone} label="Android app" />
                <h3 className="mt-4 text-xl font-semibold">Android App</h3>
                <p className="mt-2 text-sm font-semibold text-[#176b87]">
                  Kotlin / Jetpack Compose
                </p>
                <p className="mt-4 text-sm leading-6 text-[#55514a]">
                  Steering, throttle, brake, gear selector, live TX/RX status,
                  camera background, and configuration screen.
                </p>
              </div>

              <ArrowStep label="BLE" />

              <div className="hover-lift rounded-lg border border-black/10 bg-[#f8f6f1] p-5">
                <IconBadge icon={CircuitBoard} label="Motor ESP32" />
                <h3 className="mt-4 text-xl font-semibold">Motor ESP32</h3>
                <p className="mt-2 text-sm font-semibold text-[#6b5dd3]">
                  Validation + PWM/DIR
                </p>
                <p className="mt-4 text-sm leading-6 text-[#55514a]">
                  BLE server, packet validation, single applyState control path,
                  D/R interlock, mutex protection, and safe boot in Park.
                </p>
              </div>

              <ArrowStep label="Power" />

              <div className="hover-lift rounded-lg border border-black/10 bg-[#f8f6f1] p-5">
                <IconBadge icon={Zap} label="Drive hardware" />
                <h3 className="mt-4 text-xl font-semibold">Drive Hardware</h3>
                <p className="mt-2 text-sm font-semibold text-[#c2410c]">
                  Driver + dual motors
                </p>
                <p className="mt-4 text-sm leading-6 text-[#55514a]">
                  Cytron SmartDriveDuo drives two 24 VDC geared motors that move
                  the trailer using tank-drive style steering.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
              <div className="hover-lift rounded-lg border border-black/10 bg-[#f8f6f1] p-5">
                <IconBadge icon={Camera} label="Camera ESP32" />
                <h3 className="mt-4 text-xl font-semibold">Camera ESP32</h3>
                <p className="mt-2 text-sm font-semibold text-[#0f766e]">
                  Wi-Fi AP + MJPEG stream
                </p>
                <p className="mt-4 text-sm leading-6 text-[#55514a]">
                  ESP32-CAM hosts the reverse camera stream at a local Wi-Fi
                  endpoint so the app can show positioning feedback.
                </p>
              </div>

              <ArrowStep label="Wi-Fi" />

              <div className="hover-lift rounded-lg border border-black/10 bg-[#f8f6f1] p-5">
                <IconBadge icon={ShieldCheck} label="Safety layer" />
                <h3 className="mt-4 text-xl font-semibold">Safety Layer</h3>
                <p className="mt-2 text-sm font-semibold text-[#2f855a]">
                  Brake, watchdog, disconnect stop
                </p>
                <p className="mt-4 text-sm leading-6 text-[#55514a]">
                  Command heartbeat, throttle ramping, brake reset, and
                  disconnect detection keep motion deliberate and bounded.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Image
              src={`${assetBase}/software-component-diagram.png`}
              alt="Software component diagram for Android app, motor ESP32, and camera ESP32."
              width={1448}
              height={1086}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="hover-lift rounded-lg border border-cyan-300/20 bg-white shadow-xl shadow-cyan-950/20"
            />
            <Image
              src={`${assetBase}/prototype-lab.jpg`}
              alt="RC Trailer Jack prototype mounted to a mock trailer in the lab."
              width={2160}
              height={2880}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="hover-lift h-full max-h-[560px] rounded-lg border border-cyan-300/20 object-cover shadow-xl shadow-cyan-950/20"
            />
          </div>
        </div>
      </section>

      <section
        id="project-poster"
        className="relative scroll-mt-14 overflow-hidden bg-[#07111f] px-5 py-20 text-white sm:px-8 lg:px-10"
      >
        <div className="absolute inset-0 electric-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.55fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase text-[#f6c453]">
                Project Poster
              </p>
              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                The senior-design story in one slide
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                The new poster image from `Content/Slide1.JPG` is now featured
                on the site as the project poster, giving visitors a quick
                overview of the problem, engineering targets, software,
                hardware, results, and future work.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`${assetBase}/project-poster.jpg`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#f6c453] px-4 py-3 font-semibold text-[#171717] transition hover:bg-[#ffd777]"
                >
                  <ExternalLink className="h-5 w-5" aria-hidden="true" />
                  Open Poster Image
                </a>
                <a
                  href={`${assetBase}/senior-design-poster.pptx`}
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  <Download className="h-5 w-5" aria-hidden="true" />
                  Download Poster Deck
                </a>
              </div>
            </div>

            <div className="poster-frame scanline rounded-2xl border border-cyan-300/20 bg-white/[0.06] p-3 shadow-2xl shadow-cyan-950/40">
              <Image
                src={`${assetBase}/project-poster.jpg`}
                alt="RC Trailer Jack senior design poster slide with overview, engineering targets, results, software, hardware, and future improvements."
                width={3840}
                height={2160}
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="software"
        className="relative scroll-mt-14 overflow-hidden px-5 py-20 sm:px-8 lg:px-10"
      >
        <div className="absolute inset-0 electric-grid opacity-20" />
        <div className="relative mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Software"
            title="Real-time controls with embedded safeguards"
            inverse
          >
            The app sends a compact command packet every 200 ms. The ESP32
            rejects malformed packets and triggers a safe stop if the command
            stream goes silent for more than 500 ms.
          </SectionHeading>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {softwareFeatures.map((item) => (
              <div
                key={item.name}
                className="hover-lift rounded-lg border border-cyan-300/20 bg-white p-5 shadow-sm"
              >
                <IconBadge
                  icon={item.icon}
                  label={item.name}
                  className={item.accent}
                />
                <h3 className="mt-4 text-xl font-semibold">{item.name}</h3>
                <p className="mt-1 text-sm font-semibold text-[#6a6258]">
                  {item.role}
                </p>
                <p className="mt-4 text-sm leading-6 text-[#55514a]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-lg border border-black/10 bg-[#191714] p-6 text-white">
            <p className="text-sm font-semibold uppercase text-[#f6c453]">
              BLE Packet Format
            </p>
            <code className="mt-4 block overflow-x-auto rounded-lg border border-white/15 bg-black/25 p-4 text-sm text-[#f8f6f1]">
              S:&lt;dir&gt;;T:&lt;throttle&gt;;G:&lt;gear&gt;;B:&lt;brake&gt;
            </code>
          </div>
        </div>
      </section>

      <section
        id="hardware"
        className="scroll-mt-14 bg-white px-5 py-20 sm:px-8 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Hardware"
            title="Built from real trailer and motor-control components"
          >
            The hardware choices balanced load capability, mechanical
            compatibility, cost, and reliable low-speed movement.
          </SectionHeading>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {hardwareComponents.map((item) => (
              <div
                key={item.name}
                className="hover-lift rounded-lg border border-black/10 bg-[#f8f6f1] p-5"
              >
                <IconBadge
                  icon={item.icon}
                  label={item.name}
                  className={item.accent}
                />
                <h3 className="mt-4 text-xl font-semibold">{item.name}</h3>
                <p className="mt-1 text-sm font-semibold text-[#6a6258]">
                  {item.role}
                </p>
                <p className="mt-4 text-sm leading-6 text-[#55514a]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="testing"
        className="scroll-mt-14 bg-[#24211d] px-5 py-20 text-white sm:px-8 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Testing"
            title="Validated on mock and full-scale trailers"
            inverse
          >
            The project met the major movement, duty cycle, communication, and
            compatibility targets, with the 12 V supply target intentionally
            missed because the team used available 24 V battery hardware.
          </SectionHeading>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.map((result) => (
              <div
                key={result.target}
                className="hover-lift rounded-lg border border-white/15 bg-white/[0.08] p-5"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    className={
                      result.outcome === "Success"
                        ? "h-5 w-5 text-[#7ddf91]"
                        : "h-5 w-5 text-[#f6c453]"
                    }
                    aria-hidden="true"
                  />
                  <p className="font-semibold">{result.outcome}</p>
                </div>
                <h3 className="mt-4 text-xl font-semibold">{result.target}</h3>
                <p className="mt-3 text-sm leading-6 text-white/75">
                  {result.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-lg border border-white/15 bg-black">
              <video
                className="aspect-video w-full object-cover"
                controls
                preload="metadata"
              >
                <source src={`${assetBase}/test-video.mp4`} type="video/mp4" />
              </video>
            </div>
            <div className="rounded-lg border border-white/15 bg-white/[0.08] p-6">
              <IconBadge
                icon={TimerReset}
                label="Testing summary"
                className="border-white/20 bg-white/10 text-[#f6c453]"
              />
              <h3 className="mt-4 text-2xl font-semibold">What testing proved</h3>
              <p className="mt-4 leading-7 text-white/75">
                The mock trailer showed full maneuverability with roughly 200 lb
                of added load. The full-scale utility trailer confirmed movement
                with roughly 600 lb of added load, though its tongue geometry
                limited maneuverability.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="team"
        className="relative scroll-mt-14 overflow-hidden bg-[linear-gradient(135deg,#08111f,#0e1f37,#1f1732)] px-5 py-20 text-white animated-gradient sm:px-8 lg:px-10"
      >
        <div className="absolute inset-0 electric-grid opacity-25" />
        <div className="relative mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Team"
            title="Senior design project with competition impact"
            inverse
          >
            Built by Mark Halter, Jacob Thaxton, Shubh Shahra, and Kanisha for
            EECS senior design at the University of Toledo, advised by Dr.
            Daniel Georgiev.
          </SectionHeading>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <Image
              src={`${assetBase}/team-photo.jpg`}
              alt="RC Trailer Jack team with the senior design poster and working prototype."
              width={2048}
              height={1365}
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="float-soft rounded-lg border border-cyan-300/20 shadow-2xl shadow-cyan-950/40"
            />
            <div className="grid gap-4">
              <div className="hover-lift rounded-lg border border-white/10 bg-white/[0.08] p-6 backdrop-blur">
                <IconBadge icon={GraduationCap} label="University context" />
                <h3 className="mt-4 text-2xl font-semibold">
                  University of Toledo EECS
                </h3>
                <p className="mt-4 leading-7 text-slate-300">
                  The project integrated electrical engineering, embedded
                  firmware, mobile app development, mechanical prototyping, and
                  practical test planning.
                </p>
              </div>
              <div className="hover-lift rounded-lg border border-white/10 bg-white/[0.08] p-6 backdrop-blur">
                <IconBadge icon={Medal} label="Award" className="text-[#a75518]" />
                <h3 className="mt-4 text-2xl font-semibold">
                  First place KEEN Award
                </h3>
                <p className="mt-4 leading-7 text-slate-300">
                  The MVP and presentation earned first place in the KEEN Award
                  competition, emphasizing curiosity, connections, and creating
                  value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="future"
        className="relative scroll-mt-14 overflow-hidden bg-[#0a1322] px-5 py-20 text-white sm:px-8 lg:px-10"
      >
        <div className="absolute inset-0 electric-grid opacity-20" />
        <div className="relative mx-auto max-w-7xl">
          <SectionHeading eyebrow="Future Work" title="Where the prototype goes next" inverse>
            The current system proves remote control and safety behavior. The
            next iteration would make the unit more compact, more compatible,
            and more autonomous.
          </SectionHeading>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {futureWork.map((item) => (
              <div
                key={item.title}
                className="hover-lift rounded-lg border border-white/10 bg-white/[0.08] p-5 backdrop-blur"
              >
                <IconBadge icon={item.icon} label={item.title} />
                <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-300">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="documents"
        className="scroll-mt-14 bg-[#f8f6f1] px-5 py-20 sm:px-8 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Documents" title="Report, slides, and source material">
            Download the original senior design documents and decks used to
            present the project.
          </SectionHeading>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {documents.map((doc) => (
              <a
                key={doc.href}
                href={doc.href}
                download
                className="group hover-lift rounded-lg border border-black/10 bg-white p-5 transition hover:border-[#a75518]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[#a75518]">
                      {doc.fileType}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold">{doc.title}</h3>
                  </div>
                  <Download
                    className="h-5 w-5 shrink-0 text-[#55514a] transition group-hover:text-[#a75518]"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-4 text-sm leading-6 text-[#55514a]">
                  {doc.detail}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-black/10 bg-[#191714] px-5 py-8 text-white sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold">RC Trailer Jack</p>
            <p className="mt-1 text-sm text-white/65">
              Remote Control Trailer Wheel System · Senior Design 2026
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="#demo"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-3 py-2 text-sm font-semibold transition hover:bg-white/10"
            >
              <Play className="h-4 w-4" aria-hidden="true" />
              Demo
            </a>
            <a
              href={fullVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-3 py-2 text-sm font-semibold transition hover:bg-white/10"
            >
              <Radio className="h-4 w-4" aria-hidden="true" />
              YouTube Video
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
