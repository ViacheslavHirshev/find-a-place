import "ol/ol.css"
import Map from "ol/Map"
import View from "ol/View"
import TileLayer from "ol/layer/Tile"
import OSM from "ol/source/OSM"
import { fromLonLat } from "ol/proj"

export class MyMap
{
    private containerID: string;
    private map: Map;

    constructor(containerID: string)
    {
        this.containerID = containerID;
        this.map = new Map(
            {
                target: `${containerID}`,
                view: new View(
                    {
                        center: [0, 0],
                        zoom: 4
                    }),
                layers: [
                    new TileLayer({ source: new OSM() })
                ]
            }
        )
    }

    public changeCoordinates(lon: string, lat: string): void
    {
        this.map.getView().setCenter(fromLonLat([parseFloat(lon), parseFloat(lat)]));
    }
}