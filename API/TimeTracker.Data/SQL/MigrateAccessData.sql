TRUNCATE TABLE Task

-- UTC Offsets for the dates
DECLARE @mdtOffset AS INT
SET @mdtOffset = 6

DECLARE @mstOffset AS INT
SET @mstOffset = 7

-- DST Dates
DECLARE @mdtEndDate AS DATETIME
SET @mdtEndDate = '11/05/2017 02:00:00'


-- Put the data into Task
INSERT INTO Task
(ProjectId, [Description], StartDateTime, EndDateTime, IsInSystemOfRecord)
SELECT 
_ProjectID_, 
_Description_,
IIF(_StartDateTime_ < @mdtEndDate, DATEADD(hour, @mdtOffset, _StartDateTime_), DATEADD(hour, @mstOffset, _StartDateTime_)),
IIF(_EndDateTime_ < @mdtEndDate, DATEADD(hour, @mdtOffset, _EndDateTime_), DATEADD(hour, @mstOffset, _EndDateTime_)),
1 
FROM Task_temp
ORDER BY _StartDateTime_