import ProfileInfo from '../../components/Shared/ProfileInfo';

const PerformanceOverview = () => {
  return (
    <div className="page flex flex-col gap-4">
      <ProfileInfo isPerformance={true} />
    </div>
  );
};

export default PerformanceOverview;
