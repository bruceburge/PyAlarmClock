import shelve


def writeToDb():
    s = shelve.open('test_shelf.db', writeback=True)
    try:
        s['20160413053000'] = {'string': '20160413053000', 'list': [0, 1, 1, 1, 1, 1, 0]}
        print s['20160413053000']
    finally:
        s.close()


# writeToDb()

def readFromDb():
    s = shelve.open('test_shelf.db', writeback=True)
    try:

        for r in s:
            print "key: ", r, " = ", s[r]

            # print s['20160413053000']
    finally:
        s.close()


writeToDb()
readFromDb()
