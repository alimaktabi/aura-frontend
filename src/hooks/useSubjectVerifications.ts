import { skipToken } from '@reduxjs/toolkit/query';
import { MyEvaluationsContext } from 'contexts/MyEvaluationsContext';
import { SubjectInboundEvaluationsContext } from 'contexts/SubjectInboundEvaluationsContext';
import { EChartsOption } from 'echarts-for-react/src/types';
import useParseBrightIdVerificationData from 'hooks/useParseBrightIdVerificationData';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetBrightIDProfileQuery } from 'store/api/profile';
import { selectAuthData } from 'store/profile/selectors';

import {
  AuraImpact,
  AuraImpactRaw,
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

  const profileFetch = useGetBrightIDProfileQuery(
    subjectId ? { id: subjectId } : skipToken,
  );

  const myEvaluationsContext = useContext(MyEvaluationsContext);
  const subjectInboundEvaluationsContext = useContext(
    SubjectInboundEvaluationsContext,
  );

  useEffect(() => {
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
    if (subjectId && profileFetch.data) {
      setVerifications(profileFetch.data.verifications);
    }
  }, [
    myEvaluationsContext,
    subjectId,
    profileFetch,
    subjectInboundEvaluationsContext,
  ]);

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

export const useImpactEChartOption = (auraImpacts: AuraImpact[] | null) => {
  const authData = useSelector(selectAuthData);

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
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          const { data } = params;
          return data.label;
        },
        position: (point: any, params: any, dom: any, rect: any, size: any) => {
          // Destructure width from size.viewSize
          const [chartWidth] = size.viewSize;
          const tooltipWidth = dom.offsetWidth;

          // Adjust tooltip position to prevent overflow
          let xPos = point[0];
          const yPos = point[1];

          // If the tooltip is too close to the right edge, shift it to the left
          if (xPos + tooltipWidth > chartWidth) {
            xPos -= tooltipWidth;
          }

          // Return adjusted position
          return [xPos, yPos];
        },
      },
      series: [
        {
          color: '#ABCAAE',
          data: auraTopImpacts.map((item) => ({
            value: item.impact,
            label: item.evaluatorName,
            evaluator: item.evaluator,
            itemStyle: {
              color:
                authData?.brightId === item.evaluator
                  ? '#8341DE'
                  : findNearestColor(
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
  }, [auraTopImpacts, authData]);

  const impactChartSmallOption = useMemo(
    () => ({
      ...impactChartOption,
      grid: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      tooltip: undefined,
      series: [
        {
          color: '#ABCAAE',
          data: auraTopImpacts.map((item) => ({
            value: item.impact,
            label: item.evaluatorName,
            evaluator: item.evaluator,
            itemStyle: {
              color:
                authData?.brightId === item.evaluator
                  ? '#8341DE'
                  : findNearestColor(
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
    [auraTopImpacts, authData, impactChartOption],
  );

  return {
    impactChartOption,
    impactChartSmallOption,
  };
};

export const useImpactPercentage = (
  auraImpacts: AuraImpactRaw[] | null,
  subjectId: string | null | undefined,
) => {
  return useMemo(() => {
    if (auraImpacts === null || auraImpacts === undefined || !subjectId)
      return null;
    const subjectImpact = auraImpacts.find(
      (i) => i.evaluator === subjectId,
    )?.impact;
    if (!subjectImpact) return 0;
    return Math.round(
      Math.abs(subjectImpact * 100) /
        auraImpacts.reduce((a, c) => a + Math.abs(c.impact), 0),
    );
  }, [auraImpacts, subjectId]);
};

export const useTotalImpact = (auraImpacts: AuraImpactRaw[] | null) => {
  return useMemo(() => {
    if (auraImpacts === null || auraImpacts === undefined)
      return {
        totalPositiveImpact: null,
        totalNegativeImpact: null,
      };
    let totalPositiveImpact = 0;
    let totalNegativeImpact = 0;
    auraImpacts.forEach((i) => {
      if (i.impact > 0) {
        totalPositiveImpact += i.impact;
      } else {
        totalNegativeImpact += i.impact;
      }
    });
    return {
      totalPositiveImpact,
      totalNegativeImpact,
    };
  }, [auraImpacts]);
};
