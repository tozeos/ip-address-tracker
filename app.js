let ip = "";

window.onload = () => {
	sendIP()
}

function sendIP() {
	ip = document.getElementById("input").value;

	fetch(
		`https://ipgeolocation.abstractapi.com/v1/?api_key=b09bc0b236f14f2c8da72cd2fc038b75&ip_address=${ip}`
	)
		.then((res) => res.json())
		.then(function (data) {
			if (data.ip_address == undefined) {
				alert("Please, enter a valid IP Address.");
			} else {
				console.log(data)
				const ip = document.getElementById("ip");
				const location = document.getElementById("location");
				const timezone = document.getElementById("timezone");
				const isp = document.getElementById("isp");
				const cep = document.getElementById("cep");

				ip.innerText = data.ip_address;
				location.innerText = `${data.city}, ${data.region_iso_code}`;
				timezone.innerText = `UTC ${data.timezone.gmt_offset}:00 `;
				isp.innerText = `${data.connection.organization_name}`;
				cep.innerText = `${data.postal_code}`;
			}

			/* Leaflet map */

			// Find a way to center the point
			// Fix the marker
			
				var container = L.DomUtil.get('mapid');
				
				if(container != null){
				container._leaflet_id = null;
				}

				var latlong = [data.latitude, data.longitude]

				// var mymap = L.map('mapid').setView(latlong, 25);
				var mymap = L.map('mapid', {
					center: latlong,
					zoom: 30
				});

				var icon = L.icon({
					iconUrl: './public/images/icon-location.svg',
				
					iconSize:     [22, 28], // size of the icon
					iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
				});


				var marker = L.marker(latlong, {icon: icon}).addTo(mymap);
				L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
					attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
					maxZoom: 14,
					id: 'mapbox/streets-v11',
					tileSize: 512,
					zoomOffset: -1,
					accessToken: 'pk.eyJ1IjoiY2Fpa2U3MiIsImEiOiJja3JhcDJjbDI0bGNyMnBtdGgwbWg4OGF6In0.j7aIcPIN99U8Vjt9Q7K-qg'
				}).addTo(mymap);
		});
}