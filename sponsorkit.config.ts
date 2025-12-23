import { writeFile } from "fs/promises";
import { defineConfig, tierPresets as presets } from "sponsorkit";

export default defineConfig({
  outputDir: ".",
  formats: ["svg", "png"],

  tiers: [
    {
      title: "Past Sponsors",
      monthlyDollars: -1,
      preset: presets.xs,
    },
    {
      title: "Backers",
      preset: presets.small,
    },
    {
      title: "Sponsors",
      monthlyDollars: 10,
      preset: presets.base,
    },
    {
      title: "Bronze Sponsors",
      monthlyDollars: 20,
      preset: {
        avatar: {
          size: 45,
        },
        boxWidth: 55,
        boxHeight: 55,
        container: {
          sidePadding: 30,
        },
      },
    },
    {
      title: "Silver Sponsors",
      monthlyDollars: 50,
      preset: presets.medium,
    },
    {
      title: "Gold Sponsors",
      monthlyDollars: 100,
      preset: presets.large,
    },
  ],

  async onSponsorsReady(sponsors) {
    await writeFile(
      "sponsors.json",
      JSON.stringify(
        sponsors
          .filter((i) => i.privacyLevel !== "PRIVATE")
          .map((i) => ({
            name: i.sponsor.name,
            login: i.sponsor.login,
            avatar: i.sponsor.avatarUrl,
            amount: i.monthlyDollars,
            link: i.sponsor.linkUrl || i.sponsor.websiteUrl,
            org: i.sponsor.type === "Organization",
          }))
          .sort((a, b) => b.amount - a.amount),
        null,
        2,
      ),
    );
  },
});
