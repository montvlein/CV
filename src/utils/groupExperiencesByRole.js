export function groupExperiencesByRole(experiences, language) {
  return experiences.reduce((groups, experience) => {
    const role = experience.role[language];
    const lastGroup = groups[groups.length - 1];

    if (lastGroup?.role === role) {
      lastGroup.entries.push(experience);
      return groups;
    }

    groups.push({ role, entries: [experience] });
    return groups;
  }, []);
}
