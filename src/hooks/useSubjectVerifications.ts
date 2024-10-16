import { MyEvaluationsContext } from 'contexts/MyEvaluationsContext';
import { SubjectInboundEvaluationsContext } from 'contexts/SubjectInboundEvaluationsContext';
import { EChartsOption } from 'echarts-for-react/src/types';
import useParseBrightIdVerificationData from 'hooks/useParseBrightIdVerificationData';
import { useContext, useEffect, useMemo, useState } from 'react';

import {
  AuraImpact,
  getBrightIdProfile,
  Verifications,
} from '../api/auranode.service';
import { findNearestColor, valueColorMap } from '../constants/chart';
import { EvaluationCategory } from '../types/dashboard';

export const useSubjectVerifications = (
  subjectId: string | null | undefined,
  evaluationCategory: EvaluationCategory,
) => {
  const [verifications, setVerifications] = useState<Verifications | undefined>(
    undefined,
  );

  const myEvaluationsContext = useContext(MyEvaluationsContext);
  const subjectInboundEvaluationsContext = useContext(
    SubjectInboundEvaluationsContext,
  );

  useEffect(() => {
    let mounted = true;
    if (
      (myEvaluationsContext !== null &&
        myEvaluationsContext.myConnections === null) ||
      (subjectInboundEvaluationsContext !== null &&
        subjectInboundEvaluationsContext.connections === null)
    )
      return;
    const verificationDataFromConnectionsEndpoint =
      myEvaluationsContext?.myConnections?.find((c) => c.id === subjectId)
        ?.verifications ||
      subjectInboundEvaluationsContext?.connections?.find(
        (c) => c.id === subjectId,
      )?.verifications;
    if (verificationDataFromConnectionsEndpoint) {
      setVerifications(verificationDataFromConnectionsEndpoint);
      return;
    }
    setVerifications(undefined);
    if (subjectId) {
      getBrightIdProfile(subjectId).then((res) => {
        if (mounted) setVerifications(res.data.verifications);
      });
    }
    return () => {
      mounted = false;
    };
  }, [myEvaluationsContext, subjectId, subjectInboundEvaluationsContext]);

  const { auraLevel, userHasRecovery, auraScore, auraImpacts } =
    useParseBrightIdVerificationData(verifications, evaluationCategory);

  return {
    auraLevel,
    userHasRecovery,
    auraScore,
    auraImpacts,
    loading: verifications === undefined,
  };
};

export const useImpactPercent = (
  auraImpacts: AuraImpact[] | null | undefined,
  fromSubjectId: string,
) => {
  return useMemo(() => {
    const totalAbsoluteImpact = auraImpacts?.reduce(
      (a, c) => a + Math.abs(c.impact),
      0,
    );
    const evaluatorImpact = auraImpacts?.find(
      (i) => i.evaluator === fromSubjectId,
    )?.impact;
    if (!totalAbsoluteImpact || !evaluatorImpact) return 0;
    return Math.round(Math.abs(evaluatorImpact) / totalAbsoluteImpact);
  }, [auraImpacts, fromSubjectId]);
};

export const useImpactEChartOption = (
  auraImpacts: AuraImpact[] | null | undefined,
) => {
  const auraTopImpacts = useMemo(
    () =>
      auraImpacts
        ?.filter((i) => i.impact)
        .sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact))
        .slice(0, 20) ?? [],
    [auraImpacts],
  );
  const impactChartOption: EChartsOption = useMemo(() => {
    const maxImpact = auraTopImpacts
      ? Math.max(...auraTopImpacts.map((item) => Math.abs(item.impact)))
      : 0;

    return {
      xAxis: {
        type: 'category',
        axisLine: {
          show: true,
        },
        axisLabel: {
          show: false,
        },
        axisTick: {
          // Setting splitLine to null removes the lines indicating x-axis values
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        show: false,
        min: -maxImpact,
        max: maxImpact,
      },
      grid: {
        top: 15,
        bottom: 0,
        left: 0,
        right: 0,
      },
      series: [
        {
          color: '#ABCAAE',
          data: auraTopImpacts.map((item) => ({
            value: item.impact,
            itemStyle: {
              color: findNearestColor(
                item.confidence * (item.impact >= 0 ? 1 : -1),
                valueColorMap,
              ),
              borderRadius: item.impact >= 0 ? [4, 4, 0, 0] : [0, 0, 4, 4],
            },
          })),
          type: 'bar',
          barGap: '0',
          barMaxWidth: 30,
        },
      ],
    };
  }, [auraTopImpacts]);

  const impactChartSmallOption = useMemo(
    () => ({
      ...impactChartOption,
      grid: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      series: [
        {
          color: '#ABCAAE',
          data: auraTopImpacts.map((item) => ({
            value: item.impact,
            itemStyle: {
              color: findNearestColor(
                item.confidence * (item.impact >= 0 ? 1 : -1),
                valueColorMap,
              ),
              borderRadius: item.impact >= 0 ? [2, 2, 0, 0] : [0, 0, 2, 2],
            },
          })),
          label: {
            show: false,
          },
          type: 'bar',
          barMaxWidth: 10,
        },
      ],
    }),
    [auraTopImpacts, impactChartOption],
  );

  return {
    impactChartOption,
    impactChartSmallOption,
  };
};
