# AMC-Showtimes-Tampermonkey
Show next 7 days showtimes with detailed logging and subsection support, formatted

This script relies on the tampermonkey extension (https://www.tampermonkey.net/). Once the extension has been installed, you also need to give the extension `Allow User Scripts` permission in the manage extensions panel.

## DISCLAIMER: AMC SHOWTIMES ARE SUBJECT TO CHANGE WITHOUT NOTICE, THIS SCRIPT IS FOR COMPILING CURRENTLY AVAILABLE DATA FROM AMC'S WEBSITE

## Installation

1. Install the [Tampermonkey](https://www.tampermonkey.net/) extension.
2. Enable **Allow User Scripts** permission in the extension's management panel.
3. Click here to install the script: [Install AMC Showtimes Alert](https://raw.githubusercontent.com/CharlesW1/AMC-Showtimes-Tampermonkey/main/amc-showtimes.user.js)
4. Tampermonkey will prompt you to install. Once installed, it will automatically sync with this repository to keep the script up to date.

## Showcase
When navigating to the appropriate page like:

https://www.amctheatres.com/movies/avatar-fire-and-ash-53700/showtimes?date=2025-12-30&theatre=amc-dine-in-sunnyvale-12

The script will automatically call the next 14 (configurable) days of showings for this movie and aggregate it into a console logged list like so:

=== Avatar Fire And Ash @ Showtimes at AMC DINE-IN Sunnyvale 12 ===
Mon, Dec 29:
* IMAX with LASER 3D at AMC: 10:30

Tue, Dec 30:
* IMAX with LASER 3D at AMC: 9:00, 1:30, 6:00, 10:30
* Dolby Cinema 3D: 2:30, 7:00
* Dolby Cinema at AMC: 10:00
* RealD 3D: 3:45, 9:00
* Dine-In Delivery to Seat: 11:30, 8:00

Wed, Dec 31:
* IMAX with LASER 3D at AMC: 9:00, 1:30, 6:00
* Dolby Cinema 3D: 2:30, 7:00
* Dolby Cinema at AMC: 10:00
* RealD 3D: 3:15
* Dine-In Delivery to Seat: 10:30, 7:30

Thu, Jan 1:
* IMAX with LASER 3D at AMC: 9:00, 1:30, 6:00, 10:30
* Dolby Cinema 3D: 2:30, 7:00
* Dolby Cinema at AMC: 10:00
* RealD 3D: 3:45
* Dine-In Delivery to Seat: 11:30

Fri, Jan 2:
* IMAX with LASER 3D at AMC: 9:00, 1:30, 6:00, 10:15
* Dolby Cinema 3D: 2:15, 6:30
* Dolby Cinema at AMC: 10:00

Sat, Jan 3:
* IMAX with LASER 3D at AMC: 9:00, 1:30, 6:00, 10:15
* Dolby Cinema 3D: 2:15, 6:30
* Dolby Cinema at AMC: 10:00

Sun, Jan 4:
* IMAX with LASER 3D at AMC: 9:00, 1:30, 6:00, 10:15
* Dolby Cinema 3D: 2:15, 6:30
* Dolby Cinema at AMC: 10:00

Mon, Jan 5:
* IMAX with LASER 3D at AMC: 1:30, 6:00
* Dolby Cinema 3D: 2:15, 6:30

Tue, Jan 6:
* IMAX with LASER 3D at AMC: 1:30, 6:00
* Dolby Cinema 3D: 2:15, 6:30

Wed, Jan 7:
* IMAX with LASER 3D at AMC: 1:30, 6:00
* Dolby Cinema 3D: 2:15, 6:30

Thu, Jan 8:
* IMAX with LASER 3D at AMC: 1:30, 6:00

Fri, Jan 9:
* IMAX with LASER 3D at AMC: 1:30, 6:00, 10:30

Sat, Jan 10:
* IMAX with LASER 3D at AMC: 1:30, 6:00, 10:30

Sun, Jan 11:
* IMAX with LASER 3D at AMC: 1:30, 6:00, 10:30

<img width="2020" height="942" alt="image" src="https://github.com/user-attachments/assets/e03c5c27-1e21-47a7-b769-710be65e86a2" />
