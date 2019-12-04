import React, { useRef, useLayoutEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  z-index: 0;
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Location = () => {
  const mapEl = useRef(null);
  useLayoutEffect(() => {
    if (mapEl.current) {
      const map = L.map(mapEl.current, {
        center: [51.505, -0.09],
        zoom: 13
      });

      L.tileLayer(
        "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox.streets",
          accessToken:
            "pk.eyJ1IjoiamVzdXMtbW9yZW5vIiwiYSI6ImNrMjF4MWVpYTFvZWUzbnFvNGE3bGhrMHQifQ.8RVIJSEUIth27jQ4gJS6qg"
        }
      ).addTo(map);
    }
  }, []);
  return (
    <Container>
      {/* <div style={{ width: "100%", height: "100%" }} ref={mapEl} /> */}
    </Container>
  );
};

export default Location;
