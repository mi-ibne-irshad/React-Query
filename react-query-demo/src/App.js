import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import './App.css';
import HomePage from './components/Home.page';
import RQSuperHeroesPage from './components/RQSuperHeroes.page';
import SuperHeroesPage from './components/SuperHeroes.page';
import RQSuperHeroPage from './components/RQSuperHero.page';
import { ParallelQueriesPage } from './components/ParallelQueries.page';
import DynamicParallelPage from './components/DynamicParallel.page';
import DependentQueriesPage from './components/DependentQueries.page';
import PaginatedQueriesPage from './components/PaginatedQueries.page';
import InfiniteQueriesPage from './components/InfiniteQueries.page';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-parallel">Parallel Queries</Link>
              </li>
              <li>
                <Link to="/rq-dynamic-parallel">Dynamic Parallel Queries</Link>
              </li>
              <li>
                <Link to="/rq-dependent">Dependent Queries</Link>
              </li>
              <li>
                <Link to="/rq-paginated">Paginated Queries</Link>
              </li>
              <li>
                <Link to="/rq-infinite">Infinite Queries</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path='/rq-infinite' element={<InfiniteQueriesPage/>}>
            </Route>
            <Route path='/rq-paginated' element={<PaginatedQueriesPage/>}>
            </Route>
            <Route path='/rq-dependent' element={<DependentQueriesPage email='muhammadislam@example.com'/>}>
            </Route>
            <Route path='/rq-parallel' element={<ParallelQueriesPage/>}>
            </Route>
            <Route path='/rq-dynamic-parallel' element={<DynamicParallelPage heroIds={[1, 3]}/>}>
            </Route>
            {/* :heroId it's means is it's value is dynamic */}
            <Route path='/rq-super-heroes/:heroId' element={<RQSuperHeroPage/>}></Route>
            <Route path="/super-heroes" element={<SuperHeroesPage />}></Route>
            <Route
              path="/rq-super-heroes"
              element={<RQSuperHeroesPage />}
            ></Route>
            <Route path="/" element={<HomePage />}></Route>
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  );
}

export default App;
