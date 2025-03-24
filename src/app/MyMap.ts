import "ol/ol.css"
import Map from "ol/Map"
import View from "ol/View"
import TileLayer from "ol/layer/Tile"
import OSM from "ol/source/OSM"
import { fromLonLat } from "ol/proj"
import Vector from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"
import { Feature } from "ol"
import Point from "ol/geom/Point"
import Style from "ol/style/Style"
import Icon from "ol/style/Icon"
import { Coordinate } from "ol/coordinate"

export class MyMap
{
    private containerID: string;
    private map: Map;
    private vectorSource: VectorSource;

    constructor(containerID: string)
    {
        this.containerID = containerID;
        this.vectorSource = new VectorSource();

        this.map = new Map(
            {
                target: `${this.containerID}`,
                view: new View(
                    {
                        center: [0, 0],
                        zoom: 3
                    }),
                layers: [
                    new TileLayer({ source: new OSM() }),
                    new Vector({ source: this.vectorSource })
                ]
            });
    }

    private changeCoordinates(coordinates: Coordinate): void
    {
        this.map.getView().setCenter(fromLonLat(coordinates));
        this.map.getView().setZoom(6);
        this.addMarker(coordinates)
    }

    private addMarker(coordinates: Coordinate): void
    {
        const coords = fromLonLat(coordinates);

        this.vectorSource.clear();

        const marker = new Feature({
            geometry: new Point(coords)
        });

        marker.setStyle(new Style({
            image: new Icon({
                anchor: [0.5, 1],
                src: "https://openlayers.org/en/latest/examples/data/icon.png"
            })
        }));

        this.vectorSource.addFeature(marker);
    }

    public showMyLocation(): void
    {
        if ("geolocation" in navigator)
        {
            navigator.geolocation.getCurrentPosition(
                (position) =>
                {
                    const lon = position.coords.longitude;
                    const lat = position.coords.latitude;
                    this.changeCoordinates([lon, lat]);
                },
                (error) =>
                {
                    console.error("Geolocation error", error);
                },
                {
                    enableHighAccuracy: true
                });
        }
        else
        {
            alert("Geolocation is not supported");
        }
    }

    public async showLocation(location: string): Promise<void>
    {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`);

        if (response.ok)
        {
            const data = await response.json();
            const lon = parseFloat(data[0].lon);
            const lat = parseFloat(data[0].lat);
            this.changeCoordinates([lon, lat]);
        }
        else 
        {
            console.error("Failed to fetch data");
        }
    }
}