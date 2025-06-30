
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "What does OSI stand for in computer networking?",
    options: [
      "Open Systems Interconnection",
      "Operating System Interface",
      "Optical Signal Integration",
      "Online System Infrastructure"
    ],
    correctAnswer: 0
  },
  {
    id: 2,
    question: "How many layers are there in the OSI model?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "Which protocol is used for sending emails?",
    options: ["HTTP", "FTP", "SMTP", "POP3"],
    correctAnswer: 2
  },
  {
    id: 4,
    question: "What is the default port number for HTTP?",
    options: ["21", "23", "80", "443"],
    correctAnswer: 2
  },
  {
    id: 5,
    question: "Which layer of the OSI model is responsible for routing?",
    options: ["Physical Layer", "Data Link Layer", "Network Layer", "Transport Layer"],
    correctAnswer: 2
  },
  {
    id: 6,
    question: "What does TCP stand for?",
    options: [
      "Transfer Control Protocol",
      "Transmission Control Protocol",
      "Transport Communication Protocol",
      "Technical Control Procedure"
    ],
    correctAnswer: 1
  },
  {
    id: 7,
    question: "Which of the following is a connectionless protocol?",
    options: ["TCP", "UDP", "HTTP", "FTP"],
    correctAnswer: 1
  },
  {
    id: 8,
    question: "What is the maximum length of a UTP cable segment?",
    options: ["100 meters", "200 meters", "500 meters", "1000 meters"],
    correctAnswer: 0
  },
  {
    id: 9,
    question: "Which device operates at the Physical layer of the OSI model?",
    options: ["Switch", "Router", "Hub", "Bridge"],
    correctAnswer: 2
  },
  {
    id: 10,
    question: "What does DHCP stand for?",
    options: [
      "Dynamic Host Configuration Protocol",
      "Direct Host Communication Protocol",
      "Distributed Host Control Protocol",
      "Digital Host Configuration Procedure"
    ],
    correctAnswer: 0
  },
  {
    id: 11,
    question: "Which topology connects all devices to a central hub?",
    options: ["Bus Topology", "Ring Topology", "Star Topology", "Mesh Topology"],
    correctAnswer: 2
  },
  {
    id: 12,
    question: "What is the purpose of ARP?",
    options: [
      "To resolve domain names to IP addresses",
      "To resolve IP addresses to MAC addresses",
      "To route packets between networks",
      "To establish TCP connections"
    ],
    correctAnswer: 1
  },
  {
    id: 13,
    question: "Which class of IP address has the range 192.0.0.0 to 223.255.255.255?",
    options: ["Class A", "Class B", "Class C", "Class D"],
    correctAnswer: 2
  },
  {
    id: 14,
    question: "What is the default subnet mask for a Class B network?",
    options: ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.255"],
    correctAnswer: 1
  },
  {
    id: 15,
    question: "Which protocol is used for secure web browsing?",
    options: ["HTTP", "HTTPS", "FTP", "SFTP"],
    correctAnswer: 1
  },
  {
    id: 16,
    question: "What does DNS stand for?",
    options: [
      "Domain Name System",
      "Dynamic Network Service",
      "Distributed Name Server",
      "Digital Network Security"
    ],
    correctAnswer: 0
  },
  {
    id: 17,
    question: "Which layer of the TCP/IP model corresponds to the Session, Presentation, and Application layers of the OSI model?",
    options: ["Network Access Layer", "Internet Layer", "Transport Layer", "Application Layer"],
    correctAnswer: 3
  },
  {
    id: 18,
    question: "What is the purpose of NAT?",
    options: [
      "To encrypt network traffic",
      "To translate private IP addresses to public IP addresses",
      "To establish VPN connections",
      "To manage network topology"
    ],
    correctAnswer: 1
  },
  {
    id: 19,
    question: "Which device can segment collision domains but not broadcast domains?",
    options: ["Hub", "Switch", "Router", "Repeater"],
    correctAnswer: 1
  },
  {
    id: 20,
    question: "What is the default port for HTTPS?",
    options: ["80", "443", "8080", "8443"],
    correctAnswer: 1
  },
  {
    id: 21,
    question: "Which protocol is used to synchronize time across network devices?",
    options: ["SNMP", "NTP", "SMTP", "TFTP"],
    correctAnswer: 1
  },
  {
    id: 22,
    question: "What does VLAN stand for?",
    options: [
      "Virtual Local Area Network",
      "Variable Length Access Network",
      "Verified Local Access Node",
      "Virtual Link Area Network"
    ],
    correctAnswer: 0
  },
  {
    id: 23,
    question: "Which routing protocol is considered a distance-vector protocol?",
    options: ["OSPF", "RIP", "BGP", "IS-IS"],
    correctAnswer: 1
  },
  {
    id: 24,
    question: "What is the maximum number of hosts in a /24 subnet?",
    options: ["254", "255", "256", "512"],
    correctAnswer: 0
  },
  {
    id: 25,
    question: "Which frame type is used by Ethernet?",
    options: ["Token Ring", "FDDI", "IEEE 802.3", "ATM"],
    correctAnswer: 2
  },
  {
    id: 26,
    question: "What does CSMA/CD stand for?",
    options: [
      "Carrier Sense Multiple Access with Collision Detection",
      "Circuit Switched Multiple Access with Collision Delay",
      "Carrier Signal Multiple Addressing with Code Division",
      "Communication System Multiple Access with Channel Detection"
    ],
    correctAnswer: 0
  },
  {
    id: 27,
    question: "Which type of cable is immune to electromagnetic interference?",
    options: ["Coaxial cable", "Twisted pair cable", "Fiber optic cable", "Straight-through cable"],
    correctAnswer: 2
  },
  {
    id: 28,
    question: "What is the purpose of a firewall?",
    options: [
      "To amplify network signals",
      "To control network traffic based on security rules",
      "To convert protocols",
      "To manage IP address allocation"
    ],
    correctAnswer: 1
  },
  {
    id: 29,
    question: "Which protocol is used for transferring files over the internet?",
    options: ["HTTP", "SMTP", "FTP", "SNMP"],
    correctAnswer: 2
  },
  {
    id: 30,
    question: "What does WAN stand for?",
    options: [
      "Wide Area Network",
      "Wireless Access Network",
      "Web Application Network",
      "Wired Access Node"
    ],
    correctAnswer: 0
  }
];
