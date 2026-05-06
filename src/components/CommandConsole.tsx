"use client";

import { useMemo, useState } from "react";
import {
  Bluetooth,
  CircleStop,
  Gauge,
  MoveLeft,
  MoveRight,
  RotateCcw,
  ShieldCheck,
  Zap,
} from "lucide-react";

const gears = ["P", "N", "R", "D"] as const;
const steeringOptions = [
  { label: "Left", value: -100, icon: MoveLeft },
  { label: "Straight", value: 0, icon: RotateCcw },
  { label: "Right", value: 100, icon: MoveRight },
] as const;

export function CommandConsole() {
  const [gear, setGear] = useState<(typeof gears)[number]>("D");
  const [steering, setSteering] = useState(-100);
  const [throttle, setThrottle] = useState(18);
  const [brake, setBrake] = useState(false);

  const packet = useMemo(
    () => `S:${steering};T:${brake ? 0 : throttle};G:${gear};B:${brake ? 1 : 0}`,
    [brake, gear, steering, throttle],
  );
  const motion =
    gear === "P" || gear === "N" || brake || throttle === 0 ? 0 : throttle;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-[#07111f] p-5 text-white shadow-2xl shadow-cyan-950/40">
      <div className="pointer-events-none absolute inset-0 electric-grid opacity-50" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />

      <div className="relative grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-xs font-semibold uppercase text-emerald-200">
              <Bluetooth className="h-4 w-4" aria-hidden="true" />
              BLE linked
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase text-amber-200">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Watchdog armed
            </span>
          </div>

          <h3 className="mt-5 text-2xl font-semibold">Command Simulator</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Try the same control ideas used in the Android app. The packet below
            mirrors the steering, throttle, gear, and brake fields sent to the
            motor ESP32.
          </p>

          <div className="mt-5 rounded-xl border border-white/10 bg-black/30 p-4">
            <p className="text-xs font-semibold uppercase text-cyan-200">
              Current BLE Packet
            </p>
            <code className="mt-2 block overflow-x-auto text-lg font-semibold text-[#f6c453]">
              {packet}
            </code>
          </div>
        </div>

        <div className="relative rounded-xl border border-white/10 bg-white/[0.06] p-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-300">
                Gear
              </p>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {gears.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setGear(item)}
                    className={`rounded-lg border px-3 py-3 text-lg font-semibold transition ${
                      gear === item
                        ? "border-[#f6c453] bg-[#f6c453] text-[#171717] shadow-lg shadow-[#f6c453]/20"
                        : "border-white/10 bg-white/[0.06] text-white hover:border-cyan-300/50 hover:bg-cyan-300/10"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase text-slate-300">
                Steering
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {steeringOptions.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setSteering(item.value)}
                      className={`rounded-lg border px-2 py-3 transition ${
                        steering === item.value
                          ? "border-cyan-300 bg-cyan-300/20 text-cyan-100"
                          : "border-white/10 bg-white/[0.06] text-slate-200 hover:border-cyan-300/50"
                      }`}
                      title={item.label}
                    >
                      <Icon className="mx-auto h-5 w-5" aria-hidden="true" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between gap-4">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase text-slate-300">
                <Gauge className="h-4 w-4" aria-hidden="true" />
                Throttle
              </p>
              <span className="text-2xl font-semibold text-[#f6c453]">
                {brake ? 0 : throttle}%
              </span>
            </div>
            <input
              aria-label="Throttle"
              type="range"
              min="0"
              max="40"
              value={throttle}
              onChange={(event) => setThrottle(Number(event.target.value))}
              className="mt-3 w-full accent-[#f6c453]"
            />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setBrake((value) => !value)}
              className={`inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-3 font-semibold transition ${
                brake
                  ? "border-red-300 bg-red-400 text-[#171717]"
                  : "border-red-300/30 bg-red-300/10 text-red-100 hover:bg-red-300/20"
              }`}
            >
              <CircleStop className="h-5 w-5" aria-hidden="true" />
              {brake ? "Brake On" : "Brake"}
            </button>
            <button
              type="button"
              onClick={() => {
                setGear("D");
                setSteering(0);
                setThrottle(18);
                setBrake(false);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-cyan-300/30 bg-cyan-300/10 px-4 py-3 font-semibold text-cyan-100 transition hover:bg-cyan-300/20"
            >
              <Zap className="h-5 w-5" aria-hidden="true" />
              Reset Run
            </button>
          </div>

          <div className="mt-6 rounded-xl border border-white/10 bg-black/25 p-4">
            <div className="flex items-center justify-between text-xs font-semibold uppercase text-slate-300">
              <span>Trailer Motion</span>
              <span>{motion === 0 ? "Stopped" : `${motion}% drive`}</span>
            </div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-[#f6c453] to-emerald-300 transition-all duration-300"
                style={{ width: `${Math.max(8, motion * 2.2)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
