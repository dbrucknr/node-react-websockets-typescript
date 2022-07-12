SELECT
    *
FROM
     participant as p
WHERE p."userId" = 2
OR p."userId" = 3;

-- Works for standard, non-group threads
SELECT "threadId" FROM participant p
WHERE p."userId" = 2
  INTERSECT
SELECT "threadId" FROM participant
WHERE "userId" = 3;


-- This is getting warmer
-- Handles groups, but doesn't have capacity to match array
-- returns a thread on partial match, which isn't good
SELECT "threadId" FROM participant p
WHERE p."userId" = (6)
INTERSECT
SELECT "threadId" FROM participant
WHERE "userId" IN (6, 5, 4);

-- Only works for groups...
SELECT "userId" FROM participant p
    WHERE p."threadId" = (
        SELECT "threadId"
        FROM participant
        WHERE "userId" = 6
    );

SELECT "userId",
       array_agg("userId")
           OVER(PARTITION BY "threadId")
FROM participant;


--
WITH participant_master
    AS (SELECT "userId", "threadId",
       array_agg("userId") OVER(PARTITION BY "threadId" ORDER BY "userId" DESC) participants
FROM participant)
SELECT CASE WHEN
        participant_master.participants::INTEGER[] = ARRAY[6, 5, 4]::INTEGER[]
            THEN true ELSE false
     END
FROM participant_master
    WHERE "userId" = 2;

WITH participant_master
    AS (SELECT "userId", "threadId",
       array_agg("userId") OVER(PARTITION BY "threadId" ORDER BY "userId" DESC) participants
FROM participant)
SELECT * FROM participant_master;
