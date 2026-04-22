export const projects = [
  {
    slug: 'akka',
    number: '01',
    status: 'COMPLETED',
    title: 'Project MIRA',
    subtitle: '6-DOF Autonomous Robotic Arm',
    category: 'Robotics / AI',
    description:
      'A 6-DOF autonomous robotic arm powered by an NVIDIA Jetson Orin Nano. Engineered the power distribution system (handling up to 20A) using buck converters and terminal blocks. Programmed an Arduino via I2C to translate spatial AI coordinates into deterministic PWM signals for a 16-channel servo driver. Custom-designed and 3D-printed an active-cooled electronics enclosure.',
    longDescription: [
      'A 6-DOF autonomous robotic arm system designed for spatial object manipulation. The system integrates an NVIDIA Jetson Orin Nano running depth-camera-based spatial AI with an Arduino Mega acting as a real-time I2C slave controller.',
      'The Jetson computes 3D object coordinates from depth camera input and transmits target positions over I2C, while the Arduino translates these into precise PWM signals distributed across a PCA9685 16-channel servo driver to coordinate all six joints simultaneously.',
      'The power distribution system handles up to 20A across multiple voltage rails, stepped down via adjustable buck converters and distributed through organized terminal blocks with proper fusing. A custom 3D-printed electronics enclosure with active fan cooling houses all control electronics, protecting components while maintaining thermal performance under sustained operation.',
    ],
    tech: ['NVIDIA Jetson', 'Arduino', 'I2C', 'CAD', 'Power Distribution'],
    image: '/winners.jpg',
    alt: 'Project MIRA — 6-DOF Robotic Arm',
    specs: [
      { label: 'Platform', value: 'NVIDIA Jetson Orin Nano' },
      { label: 'Co-processor', value: 'Arduino Mega 2560' },
      { label: 'Degrees of Freedom', value: '6' },
      { label: 'Communication', value: 'I2C (Jetson → Arduino)' },
      { label: 'Servo Driver', value: 'PCA9685 16-Channel PWM' },
      { label: 'Max Current Draw', value: '20A' },
      { label: 'Power Regulation', value: 'Adjustable Buck Converters' },
      { label: 'Enclosure', value: '3D-Printed PLA, Active Fan Cooling' },
    ],
    gallery: [
      { type: 'image', src: '/winners.jpg', alt: 'Project MIRA team winners', caption: 'Competition winners' },
      { type: 'image', src: '/akka.jpg', alt: 'Project MIRA robotic arm assembly', caption: 'Robotic arm assembly' },
      { type: 'video', src: '/workingmira.mov', caption: 'MIRA autonomously picking up a bottle' },
    ],
  },
  {
    slug: 'turret',
    number: '02',
    status: 'COMPLETED',
    title: 'Autonomous Targeting Turret',
    subtitle: 'Computer-Vision Nerf Turret',
    category: 'Computer Vision / Embedded',
    description:
      'An autonomous computer-vision turret powered by a Raspberry Pi Zero W2. Implemented YOLOv8n to identify and track specific targets while executing a strict human-detection safety lock. Integrated DC motors with encoders and limit switches for precise pan/tilt collision avoidance, alongside a servo-actuated firing mechanism.',
    longDescription: [
      'An autonomous Nerf turret system powered by a Raspberry Pi Zero W2 running real-time computer vision. The system uses a YOLOv8n model optimized for edge deployment to detect, classify, and track targets in the camera feed at usable framerates on the Pi\'s limited hardware.',
      'A critical safety feature implements a human-detection lockout — if any person is detected in frame, the firing mechanism is software-locked regardless of target status. This required training the model to reliably distinguish between valid targets and human subjects.',
      'The mechanical platform uses DC gear motors with rotary encoders for precise pan and tilt control, augmented by hardware limit switches for collision avoidance at travel extremes. The firing mechanism is actuated by a dedicated servo motor. All motor control, sensor reading, and vision processing run in parallel threads on the Pi\'s quad-core ARM processor.',
    ],
    tech: ['Raspberry Pi', 'YOLOv8n Vision', 'Encoders', 'Servos/DC Motors', 'Python'],
    image: '/turret.jpg',
    alt: 'Autonomous Targeting Turret',
    specs: [
      { label: 'Platform', value: 'Raspberry Pi Zero W2' },
      { label: 'Vision Model', value: 'YOLOv8n (Ultralytics)' },
      { label: 'Safety System', value: 'Human-Detection Lockout' },
      { label: 'Pan Motor', value: 'DC Gear Motor w/ Encoder' },
      { label: 'Tilt Motor', value: 'DC Gear Motor w/ Encoder' },
      { label: 'Collision Avoidance', value: 'Hardware Limit Switches' },
      { label: 'Firing Mechanism', value: 'Servo-Actuated' },
      { label: 'Language', value: 'Python (Multithreaded)' },
    ],
    gallery: [
      { type: 'image', src: '/turret.jpg', alt: 'Autonomous targeting turret', caption: 'Completed turret assembly' },
    ],
  },
  {
    slug: 'battlebot',
    number: '03',
    status: 'COMPLETED',
    title: 'Tournament Battle Bot',
    subtitle: 'Combat Robot — Head Electrical Engineer',
    category: 'Embedded Systems / Competition',
    description:
      'Head Electrical Engineer for a tournament-winning combat robot. Designed the electronic control system, including motor drivers, power regulation, and signal routing. Programmed dual ESP32 microcontrollers in C++ to interpret Bluetooth inputs and operate wheel and lift motors in real-time.',
    longDescription: [
      'Head Electrical Engineer for a tournament-winning combat robot competing in organized battlebots events. Designed the complete electronic control architecture from scratch, including motor driver selection and integration, power regulation across high-current paths, and signal routing between all subsystems.',
      'The control system runs on dual ESP32 microcontrollers programmed in C++. One ESP32 handles Bluetooth communication with the operator controller, parsing joystick inputs and button states in real-time. The second ESP32 acts as the motor controller, translating parsed commands into PWM signals for the wheel drive motors and the pneumatic lift mechanism.',
      'Designed all wiring harnesses and interconnects to withstand the extreme shock and vibration of combat conditions. Implemented failsafe routines including watchdog timers and signal loss detection to ensure the robot safely stops if communication is interrupted.',
    ],
    tech: ['ESP32', 'C++', 'Bluetooth', 'Motor Drivers', 'Wiring'],
    image: '/andy.jpg',
    alt: 'Tournament Battle Bot',
    specs: [
      { label: 'Controllers', value: 'Dual ESP32 Microcontrollers' },
      { label: 'Language', value: 'C++' },
      { label: 'Communication', value: 'Bluetooth (Controller → Bot)' },
      { label: 'Drive', value: 'Dual Wheel Motors' },
      { label: 'Weapon', value: 'Pneumatic Lift Mechanism' },
      { label: 'Safety', value: 'Watchdog Timer, Signal Loss Detection' },
      { label: 'Role', value: 'Head Electrical Engineer' },
      { label: 'Result', value: 'Tournament Winner' },
    ],
    gallery: [
      { type: 'image', src: '/andy.jpg', alt: 'Tournament battle bot', caption: '"ANDY" — competition-ready' },
    ],
  },
];

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug) || null;
}
