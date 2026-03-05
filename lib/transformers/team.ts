export function transformTeam(data: any) {
  const team = data.team;

  return {
    id: team.id,
    name: team.displayName,
    logo: team.logos?.[0]?.href,
    colors: {
      primary: team.color,
      alternate: team.alternateColor,
    },
    record: {
      overall: team.record?.items?.find((r: any) => r.type === "total")?.summary,
      conference: team.record?.items?.find((r: any) => r.type === "vsconf")?.summary,
    },
    coach: team.coaches?.[0]
      ? `${team.coaches[0].firstName} ${team.coaches[0].lastName}`
      : null,
    venue: team.venue?.fullName,
  };
}

export default { transformTeam };