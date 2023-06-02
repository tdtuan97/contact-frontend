import React from "react";
import {
    MapContainer,
    TileLayer,
    Circle,
    Tooltip,
    Popup, useMap, Marker
} from "react-leaflet";
import "react-leaflet-markercluster/dist/styles.min.css";
import MarkerClusterGroup from "react-leaflet-markercluster";
import {LayersControl} from 'react-leaflet';

const {BaseLayer} = LayersControl;
const position    = [0, 0]

function SetViewOnClick({coords}) {
    const map = useMap();
    map.setView(coords, map.getZoom());

    return null;
}

const Map = (props) => {
    const {latCenter, lngCenter, zoom, coordinatesList} = props
    /* let [showTooltip, setShowTooltip]                   = React.useState(false);
     const mapRef                                        = React.useRef();

     const renderMarkers = () => {
         const map = mapRef.current;

         if (map) {
             setShowTooltip(map.leafletElement.getZoom() > 13 ? true : false);
         }
     };*/

    return (
        <MapContainer
            //scrollWheelZoom={false}
            //ref={mapRef}
            //onzoomend={() => renderMarkers()}
            center={position}
            zoom={zoom}
            style={{width: "100%", height: "100%", position: "absolute", zIndex: "10"}}
        >
            <SetViewOnClick
                coords={[latCenter, lngCenter]}
            />
            <TileLayer
                url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
            />
            {
                <MarkerClusterGroup showCoverageOnHover={false}>
                    {
                        coordinatesList.map((item, key) => {
                            const coordinates = item.coordinates;
                            return (
                                <Marker key={key} position={[coordinates.lat, coordinates.lng]}>
                                    <Popup>
                                        <div className="coordinates-wrap">
                                            <div className="coordinates-summary">
                                                <div>{`${item.name} - ${item.powerValue} ${item.powerUnit}`}</div>
                                                <div>{item.description}</div>
                                                <div>{item.address}</div>
                                                <div>{item.modules}</div>
                                                <div>{item.southOrientation}</div>
                                                <div>{item.tilt}</div>
                                                <div>{item.inverter}</div>
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            )
                        })
                    }
                </MarkerClusterGroup>
            }

            {/*{
                coordinatesList.map((coordinates, key) => {
                    return (
                        <Circle key={key}
                                position={[coordinates.lat, coordinates.lng]}
                                center={[coordinates.lat, coordinates.lng]}
                                color="green"
                                fillColor="green"
                                radius={300}

                        >
                            <Tooltip
                                className="circle-tooltip"
                                permanent={true}
                                direction="center"
                            >
                                {coordinates.name}
                            </Tooltip>
                            <Popup>
                                <div className="coordinates-wrap">
                                    <div className="coordinates-summary">
                                        <div>{coordinates.name}</div>
                                        <div>SPUC Solar Portfolio</div>
                                        <div>Today at 20:30</div>
                                    </div>
                                    <div className="coordinates-value">
                                        Power active total
                                    </div>
                                </div>
                            </Popup>
                        </Circle>
                    )
                })
            }*/}

            <LayersControl>
                {/*<BaseLayer checked name="Stadia Alidade Smooth">
                    <TileLayer
                        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
                    />
                </BaseLayer>
                <BaseLayer name="Stadia OSMB right">
                    <TileLayer
                        url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
                    />
                </BaseLayer>*/}
                <BaseLayer checked name="Cartodb Base Maps">
                    <TileLayer
                        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
                    />
                </BaseLayer>
                {/*<BaseLayer name="OpenStreetMap">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </BaseLayer>*/}
                <BaseLayer name="Esri.WorldImagery">
                    <TileLayer
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    />
                </BaseLayer>
            </LayersControl>
        </MapContainer>
    );
}
export default Map;
