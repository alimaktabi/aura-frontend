import EvaluationsDetails from 'components/Shared/EvaluationsDetails/index';
import {SubjectInboundEvaluationsContextProvider} from 'contexts/SubjectInboundEvaluationsContext';
import {useSelector} from 'react-redux';

import ActivitiesCard from '../../components/Shared/ActivitiesCard/index';
import ProfileInfo from '../../components/Shared/ProfileInfo';
import {selectAuthData} from '../../store/profile/selectors';
import LinkCard from './LinkCard';

const PerformanceOverview = () => {
  const color = {
    Player: 'pastel-green',
    Trainer: 'pastel-orange',
    Manager: 'pastel-blue',
  };
  const authData = useSelector(selectAuthData);
  if (!authData) {
    return <div>Not logged in</div>;
  }
  return (
    <SubjectInboundEvaluationsContextProvider subjectId={authData.brightId}>
      <div className="page flex flex-col gap-4">
        <ProfileInfo
          subjectId={authData.brightId}
          isPerformance={true}
          // role="Player" // this name should be dynamic and be shown on the top of the page - value is set on Routes.tsx
          color={color.Player} // this color should be based on role
        />
        <ActivitiesCard/>
        <EvaluationsDetails
          subjectId={authData.brightId}
          title="Evaluation by Trainers"
          hasHeader={true}
          hasBtn={true}
        />
        <LinkCard/>
      </div>
    </SubjectInboundEvaluationsContextProvider>
  );
};

export default PerformanceOverview;
