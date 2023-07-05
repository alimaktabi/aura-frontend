import { ModalItem } from '../../components/Shared/Modal/ModalItem';
import { SubjectCard } from '../SubjectsEvaluation/SubjectCard';
import { useInboundConnections } from '../../hooks/useSubjectConnections.ts';

export const ConnectionListModal = ({
  subjectId,
}: {
  subjectId: string | undefined;
}) => {
  const { inboundConnections } = useInboundConnections(subjectId);
  return (
    <div className="flex flex-col gap-6 max-h-[600px]">
      <div className="flex w-full justify-between">
        <p>Filters:</p>
        <ModalItem title="Mutual Connections" isSelected={false} icon={null} />
      </div>
      <div className="flex flex-col overflow-scroll overscroll-contain gap-2.5 w-full -mb-5 pb-5">
        {inboundConnections?.map((subject) => (
          <SubjectCard subjectId={subject.id} key={subject.id} />
        ))}
      </div>
    </div>
  );
};
