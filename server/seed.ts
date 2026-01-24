import prisma from './lib/prisma';

async function main() {
    const resources = [
        {
            title: "Phishing 101: How to Spot a Fake",
            type: "Article",
            content: "Phishing is a type of social engineering where an attacker sends a fraudulent...",
            duration: "5 min read",
            level: "Beginner",
            category: "Phishing",
            url: "#"
        },
        {
            title: "Setting up a Password Manager",
            type: "Video",
            content: "Learn how to use LastPass or 1Password to secure your accounts...",
            duration: "10 min watch",
            level: "Intermediate",
            category: "Passwords",
            url: "#"
        },
        {
            title: "Network Security Basics",
            type: "Course",
            content: "Understanding firewalls, VPNs, and public Wi-Fi risks...",
            duration: "1 hour",
            level: "Advanced",
            category: "Network",
            url: "#"
        },
        {
            title: "Social Engineering Attacks",
            type: "Article",
            content: "Social engineering relies on manipulating people into performing actions...",
            duration: "7 min read",
            level: "Beginner",
            category: "Social Engineering",
            url: "#"
        }
    ];

    console.log('Seeding resources...');
    for (const r of resources) {
        await prisma.resource.create({ data: r });
    }
    console.log('Seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
