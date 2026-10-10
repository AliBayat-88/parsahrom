import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Loader2 } from "lucide-react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customMarkerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

function LocationMarker({ position, setPosition }) {
    const map = useMap();

    useMapEvents({
        click(e) {
            setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    useEffect(() => {
        if (position) {
            map.flyTo([position.lat, position.lng], 15);
        }
    }, [position, map]);

    return position ? (
        <Marker
            position={[position.lat, position.lng]}
            icon={customMarkerIcon}
            draggable={true}
            eventHandlers={{
                dragend(e) {
                    const marker = e.target;
                    const pos = marker.getLatLng();
                    setPosition({ lat: pos.lat, lng: pos.lng });
                },
            }}
        />
    ) : null;
}

export const LocationPicker = ({ value, onChange }) => {
    const [isGettingLocation, setIsGettingLocation] = useState(false);
    const [isDark, setIsDark] = useState(false);

    // بررسی و شنود تغییرات دارک‌مود جهت به‌روزرسانی تم لایه نقشه
    useEffect(() => {
        const checkDarkMode = () => {
            setIsDark(document.documentElement.classList.contains("dark"));
        };

        checkDarkMode();

        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    const handleGetCurrentLocation = () => {
        if ("geolocation" in navigator) {
            setIsGettingLocation(true);
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    onChange({
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                    });
                    setIsGettingLocation(false);
                },
                () => {
                    alert("خطا در دریافت موقعیت. لطفاً دسترسی GPS مرورگر را فعال کنید.");
                    setIsGettingLocation(false);
                },
                { enableHighAccuracy: true }
            );
        } else {
            alert("مرورگر شما از قابلیت Geolocation پشتیبانی نمی‌کند.");
        }
    };

    return (
        <div className="space-y-2 py-4">
            <div className="flex items-center justify-between">
                <label className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    تعیین موقعیت دقیق روی نقشه
                </label>

                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleGetCurrentLocation}
                    disabled={isGettingLocation}
                    className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-emerald-600 dark:text-emerald-400 text-xs h-8 gap-1.5"
                >
                    {isGettingLocation ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                        <Navigation className="w-3.5 h-3.5" />
                    )}
                    موقعیت فعلی من
                </Button>
            </div>

            <div className="h-64 w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 relative z-0">
                <MapContainer
                    center={[value.lat, value.lng]}
                    zoom={13}
                    scrollWheelZoom={true}
                    className="h-full w-full"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url={
                            isDark
                                ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                                : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                        }
                    />
                    <LocationMarker position={value} setPosition={onChange} />
                </MapContainer>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 px-1 font-mono" dir="ltr">
                <span>Lat: {value.lat.toFixed(6)}</span>
                <span>Lng: {value.lng.toFixed(6)}</span>
            </div>
        </div>
    );
};
