// Simple function to accomodate for CBBD naming convention when looking up teams
export function formatTeamName(team: string) {
  return team.replace(/\bSt$/, "St.");
}