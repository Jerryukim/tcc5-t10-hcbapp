import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const doctors = [
    {
      id: "dr-james-apah",
      name: "Dr James Apah",
      email: "drjamesapah@test.com",
      wallet: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      role: "ADMIN",
      specialty: "General Physician",
    },
    {
      id: "dr-monica-hart",
      name: "Dr Monica Hart",
      email: "drmonicahart@test.com",
      wallet: "0xfe9e8709d3215310075d67E3ed32A380CCf451C8",
      role: "ADMIN",
      specialty: "General Physician",
    },
    {
      id: "dr-tunde-adeyemi",
      name: "Dr Tunde Adeyemi",
      email: "drtundeadeyemi@test.com",
      wallet: "0x66f820a414680B5bcda5eECA5dea238543F42054",
      role: "ADMIN",
      specialty: "General Physician",
    },
    {
      id: "dr-kelvin-wright",
      name: "Dr Kelvin Wright",
      email: "drkelvinwright@test.com",
      wallet: "0x53d284357ec70cE289D6D64134DfAc8E511c8a3D",
      role: "ADMIN",
      specialty: "General Physician",
    },
    {
      id: "dr-maxwell-tay",
      name: "Dr Maxwell Tay",
      email: "drmaxwelltay@test.com",
      wallet: "0xdd870fa1b7c4700f2bd7f44238821c26f7392148",
      role: "ADMIN",
      specialty: "Dentist",
    },
    {
      id: "dr-helen-ford",
      name: "Dr Helen Ford",
      email: "drhelenford@test.com",
      wallet: "0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0",
      role: "ADMIN",
      specialty: "Dentist",
    },
    {
      id: "dr-isaac-nolan",
      name: "Dr Isaac Nolan",
      email: "drisaacnolan@test.com",
      wallet: "0x583031d1113ad414f02576bd6afaBfb302140225",
      role: "ADMIN",
      specialty: "Dentist",
    },
    {
      id: "dr-faith-osimhen",
      name: "Dr Faith Osimhen",
      email: "drfaithosimhen@test.com",
      wallet: "0xdc76cd25977e0a5ae17155770273ad58648900d3",
      role: "ADMIN",
      specialty: "Gynecologist",
    },
    {
      id: "dr-samuel-moore",
      name: "Dr Samuel Moore",
      email: "drsamuelmoore@test.com",
      wallet: "0x281055afc982d96Fab65b3a49c7F9dB21cF6bE8a",
      role: "ADMIN",
      specialty: "Pediatric",
    },
    {
      id: "dr-jeremiah-mason",
      name: "Dr Jeremiah Mason",
      email: "drjeremiahmason@test.com",
      wallet: "0x9f8F72aA9304c8B593d555F12ef6589Cc3A579A2",
      role: "ADMIN",
      specialty: "Ophthalmologist",
    },
    {
      id: "dr-joseph-ufia",
      name: "Dr Joseph Ufia",
      email: "drjosephufia@test.com",
      wallet: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      role: "ADMIN",
      specialty: "Psychiatrist",
    },
    {
      id: "dr-jacob-sunday",
      name: "Dr Jacob Sunday",
      email: "drjacobsunday@test.com",
      wallet: "0x53d284357ec70cE289D6D64134DfAc8E511c8a3D",
      role: "ADMIN",
      specialty: "Dermatology",
    },
    {
      id: "dr-faith-bob",
      name: "Dr Faith Bob",
      email: "drfaithbob@test.com",
      wallet: "0xfe9e8709d3215310075d67E3ed32A380CCf451C8",
      role: "ADMIN",
      specialty: "Neurologist",
    },
    {
      id: "dr-precious-john",
      name: "Dr Precious John",
      email: "drpreciousjohn@test.com",
      wallet: "0x66f820a414680B5bcda5eECA5dea238543F42054",
      role: "ADMIN",
      specialty: "Optician",
    },
    {
      id: "dr-ability-ifa",
      name: "Dr Ability Ifa",
      email: "drabilityifa@test.com",
      wallet: "0xdd870fa1b7c4700f2bd7f44238821c26f7392148",
      role: "ADMIN",
      specialty: "Cardiologist",
    },
    {
      id: "dr-samuel-carter",
      name: "Dr Samuel Carter",
      email: "drsamuelcarter@test.com",
      wallet: "0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0",
      role: "ADMIN",
      specialty: "Cardiologist",
    },
    {
      id: "dr-faith-coleman",
      name: "Dr Faith Coleman",
      email: "drfaithcoleman@test.com",
      wallet: "0x583031d1113ad414f02576bd6afaBfb302140225",
      role: "ADMIN",
      specialty: "Cardiologist",
    },
    {
      id: "dr-ibrahim-hassan",
      name: "Dr Ibrahim Hassan",
      email: "dribrahimhassan@test.com",
      wallet: "0x281055afc982d96Fab65b3a49c7F9dB21cF6bE8a",
      role: "ADMIN",
      specialty: "Cardiologist",
    },
    {
      id: "dr-daniel-park",
      name: "Dr Daniel Park",
      email: "drdanielpark@test.com",
      wallet: "0xdc76cd25977e0a5ae17155770273ad58648900d3",
      role: "ADMIN",
      specialty: "Neurologist",
    },
    {
      id: "dr-maria-gonzalez",
      name: "Dr Maria Gonzalez",
      email: "drmariagonzalez@test.com",
      wallet: "0x9f8F72aA9304c8B593d555F12ef6589Cc3A579A2",
      role: "ADMIN",
      specialty: "Neurologist",
    },
    {
      id: "dr-chen-wei",
      name: "Dr Chen Wei",
      email: "drchenwei@test.com",
      wallet: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      role: "ADMIN",
      specialty: "Pediatric",
    },
    {
      id: "dr-anita-kapoor",
      name: "Dr Anita Kapoor",
      email: "dranitakapoor@test.com",
      wallet: "0x53d284357ec70cE289D6D64134DfAc8E511c8a3D",
      role: "ADMIN",
      specialty: "Pediatric",
    },
    {
      id: "dr-olivia-bennett",
      name: "Dr Olivia Bennett",
      email: "droliviabennett@test.com",
      wallet: "0xfe9e8709d3215310075d67E3ed32A380CCf451C8",
      role: "ADMIN",
      specialty: "Dermatology",
    },
    {
      id: "dr-ahmed-elsayed",
      name: "Dr Ahmed El-Sayed",
      email: "drahmedelsayed@test.com",
      wallet: "0x66f820a414680B5bcda5eECA5dea238543F42054",
      role: "ADMIN",
      specialty: "Dermatology",
    },
    {
      id: "dr-laura-schmidt",
      name: "Dr Laura Schmidt",
      email: "drlauraschmidt@test.com",
      wallet: "0xdd870fa1b7c4700f2bd7f44238821c26f7392148",
      role: "ADMIN",
      specialty: "Psychiatrist",
    },
    {
      id: "dr-yusuf-abdullahi",
      name: "Dr Yusuf Abdullahi",
      email: "dryusufabdullahi@test.com",
      wallet: "0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0",
      role: "ADMIN",
      specialty: "Ophthalmologist",
    },
    {
      id: "dr-sophie-laurent",
      name: "Dr Sophie Laurent",
      email: "drsophielaurent@test.com",
      wallet: "0x583031d1113ad414f02576bd6afaBfb302140225",
      role: "ADMIN",
      specialty: "Optician",
    },
  ];

  for (const doctor of doctors) {
    await prisma.user.upsert({
      where: { email: doctor.email },
      update: {
        name: doctor.name,
        wallet: doctor.wallet,
        specialty: doctor.specialty,
        role: "ADMIN",
      },
      create: {
        ...doctor,
        role: "ADMIN" as any,
      },
    });
  }

  console.log(`Seeded ${doctors.length} doctors successfully.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });