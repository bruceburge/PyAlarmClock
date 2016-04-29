import threading
import time
import AlarmStorage
# import LedController


class AlarmCheck(object):
    """ Threading example class
    The run() method will be started and it will run in the background
    until the application exits.
    """

    def __init__(self, interval=30):
        """ Constructor
        :type interval: int
        :param interval: Check interval, in seconds
        """
        self.interval = interval

        thread = threading.Thread(target=self.run, args=())
        thread.daemon = True  # Daemonize thread
        thread.start()  # Start the execution

    def run(self):
        """ Method that runs forever """
        print("alarm check started at: " + time.strftime('%X %x %Z'))
        alarmflag = 99999

        while True:
            """ if alarm is updated, make sure we check for new ones """
            alarms = AlarmStorage.ReturnAlarmsInJson()
            alarmtime = ((time.localtime().tm_hour * 60) + time.localtime().tm_min)
            dayindex = time.localtime().tm_wday

            # fix day index to match indexing
            if dayindex == 6:
                dayindex = 0
            else:
                dayindex += 1

            # print("alarmflag "+str(alarmflag)+" alarmtime "+str(alarmtime) +" != "+ str(alarmflag != alarmtime))

            # see if have an alarm at this time, and that we haven't alerted for it already for today
            if str(alarmtime) in alarms.keys() and alarmflag != alarmtime+dayindex:
                # make sure the alarm is active and make sure it should be alerted today.
                if alarms[str(alarmtime)]['isActive'] == u'1' and alarms[str(alarmtime)]['days'][dayindex] == 1:
                    # alarm time plus the day index makes sure the triggering is only for a specific day and time.
                    alarmflag = alarmtime+dayindex
                    print("trigger alarm: " + str(alarmtime))
                    # LedController.slow_illumination()

            time.sleep(self.interval)
