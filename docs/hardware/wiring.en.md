# Wiring
Now that you've assembled your RLG G1 Neck, it is time to hook everything up!
[//]: # (Make and place wiring diagram here)

There are only a few things to be noted about how each cable should be connected:
- **C1 Cameras**
  - A usb 3.0 capable hub will probably work for both cameras. Just make sure it has enough bandwidth
- **Accuvision**
  - Hub will probably fail; **Connect directly to Jetson/PC with Superspeed USB capable cables** (the reason for this is still unknown)
  - The cameras need their own 5v supply; you can have them both powered by a PD decoy module
- U2D2: Make sure the micro USB cable actually has data lines (sometimes they don't)