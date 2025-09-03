import { getOurteamPage, getTeam } from '../../lib/api'
import TeamComponent from "../../components/team/team";

export default async function OurTeam() {
  const meta = await getOurteamPage()
  const team = await getTeam()
  const meta_data = meta?.pages?.edges[0].node

  return (
    <TeamComponent meta={meta_data} team={team} />
  )
}
